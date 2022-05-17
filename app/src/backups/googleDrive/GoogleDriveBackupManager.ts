import {BackupLogDataStore} from 'src/database/BackupLogDataStore'
import {DatabaseManager} from 'src/database/DatabaseManager'
import {BackupLogModel} from 'src/models/BackupLogModel'
import {BackupModel} from 'src/models/BackupModel'
import {BackupStatus} from 'src/models/BackupStatus'
import {BackupType} from 'src/models/BackupType'
import {BackupManager} from 'src/backups/BackupManager'
import {v4 as uuid} from 'uuid'
import {NoteDataStore} from 'src/database/NoteDataStore'
import {
  gapiCreateFile,
  gapiCreateFolder,
  gapiUpdateFile,
} from './googleDriveApi'
import {BackupDataStore} from 'src/database/BackupDataStore'
import {GoogleDriveBackupCredentials} from 'src/models/GoogleDriveBackupCredentials'
import {useAppStore} from 'src/providers/AppStoreProvider'
import {AppStore} from 'src/store/appStore'

const FOLDER_NAME = 'Steadfastly Notes (Do not modify)'

export class GoogleDriveBackupManager implements BackupManager {
  private backupInProgress = Promise.resolve()
  constructor(private backup: BackupModel) {}

  static async setup(
    db: DatabaseManager,
    credentials: GoogleDriveBackupCredentials,
  ): Promise<BackupModel> {
    const {id: folderId} = await gapiCreateFolder(
      credentials.accessToken,
      FOLDER_NAME,
    )
    const backup: BackupModel = {
      type: BackupType.GOOGLE,
      credentials,
      folderId,
      notesToSync: [],
      // Set to the beginning of time so that all data is synced for the new backup
      lastSyncedAt: new Date(0),
    }

    await BackupDataStore.insert(db, backup)

    return backup
  }

  private startBackupInternal(
    db: DatabaseManager,
    appStore: AppStore,
  ): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const backupLog: BackupLogModel = {
        id: uuid(),
        type: BackupType.GOOGLE,
        status: BackupStatus.IN_PROGRESS,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      await BackupLogDataStore.insert(db, backupLog)

      const allNotes = await NoteDataStore.findAll(db)
      const notesPendingBackup = allNotes.filter(
        note => note.updatedAt > this.backup.lastSyncedAt,
      )

      if (notesPendingBackup.length > 0) {
        const note = notesPendingBackup[0]
        const filename = `${note.id}.md`
        const content = JSON.stringify(note)
        const accessToken = this.backup.credentials.accessToken
        const folderId = this.backup.folderId

        if (!note.googleDriveFileId) {
          // create
          const {id: fileId} = await gapiCreateFile(
            filename,
            folderId,
            content,
            accessToken,
          )

          await appStore.updateNote({...note, googleDriveFileId: fileId}, db)
        } else {
          await gapiUpdateFile(note.googleDriveFileId, content, accessToken)
        }
      }
    })
  }

  init(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  remove(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async startBackup(db: DatabaseManager, appStore: AppStore): Promise<void> {
    this.backupInProgress.finally(() => {
      this.startBackupInternal(db, appStore)
    })
  }
}
