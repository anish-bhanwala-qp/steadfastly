import {BackupModel} from 'src/models/BackupModel'
import {NoteModel} from 'src/models/NoteModel'
import {BackupManager} from '../Backup'

export class GoogleDriveBackupManager implements BackupManager {
  constructor(private backupCredentials: BackupModel) {}

  init(): Promise<void> {
    throw new Error('Method not implemented.')
  }
  remove(): Promise<void> {
    throw new Error('Method not implemented.')
  }
  addNote(note: NoteModel): Promise<void> {
    throw new Error('Method not implemented.')
  }
  updateNote(note: NoteModel): Promise<void> {
    throw new Error('Method not implemented.')
  }
  deleteNote(note: NoteModel): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
