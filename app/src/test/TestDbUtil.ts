import {v4 as uuid} from 'uuid'
import {DatabaseManager} from 'src/database/DatabaseManager'
import {NoteDataStore} from 'src/database/NoteDataStore'
import {NoteModel} from 'src/models/NoteModel'

export const connectToTestDb = async (): Promise<[string, DatabaseManager]> => {
  const databaseName = uuid()
  const db = new DatabaseManager()
  await db.connect(databaseName, 1)
  return [databaseName, db]
}

export const populateTestNotes = async (
  db: DatabaseManager,
): Promise<NoteModel[]> => {
  const note1: NoteModel = {
    id: uuid(),
    title: 'Test note 1',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  await NoteDataStore.insert(db, note1)
  const note2: NoteModel = {
    id: uuid(),
    title: 'Test note 2',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  await NoteDataStore.insert(db, note2)

  return [note1, note2]
}
