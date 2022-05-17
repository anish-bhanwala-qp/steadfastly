export interface NoteModel {
  id: string
  title?: string
  content?: string
  googleDriveFileId?: string
  createdAt: Date
  updatedAt: Date
}
