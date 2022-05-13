import {NoteModel} from 'src/models/NoteModel'

export interface BackupManager {
  init(): Promise<void>
  remove(): Promise<void>

  addNote(note: NoteModel): Promise<void>
  updateNote(note: NoteModel): Promise<void>
  deleteNote(note: NoteModel): Promise<void>
}
