import {BackupLogDataStore} from 'src/database/BackupLogDataStore'
import {DatabaseManager} from 'src/database/DatabaseManager'
import {BackupLogModel} from 'src/models/BackupLogModel'
import {BackupModel} from 'src/models/BackupModel'
import {BackupStatus} from 'src/models/BackupStatus'
import {BackupType} from 'src/models/BackupType'
import {BackupManager} from 'src/backups/BackupManager'
import {v4 as uuid} from 'uuid'
import {NoteDataStore} from 'src/database/NoteDataStore'
import {gapiCreateFile} from './googleDriveApi'

export class GoogleDriveBackupManager implements BackupManager {
  private backupInProgress = Promise.resolve()
  constructor(private backup: BackupModel) {}

  private startBackupInternal(db: DatabaseManager): Promise<void> {
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
        await gapiCreateFile(filename, content, accessToken)
      }
    })
  }

  init(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  remove(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async startBackup(db: DatabaseManager): Promise<void> {
    this.backupInProgress.finally(() => {
      this.startBackupInternal(db)
    })
  }
}
