import {GoogleDriveBackupCredentials} from 'src/models/GoogleDriveBackupCredentials'
import {BackupType} from 'src/models/BackupType'
import {NoteModel} from 'src/models/NoteModel'

export interface BackupModel {
  // type is used a primary key
  type: BackupType
  credentials: GoogleDriveBackupCredentials
  lastSyncedAt: Date
  notesToSync: NoteModel[]
}
