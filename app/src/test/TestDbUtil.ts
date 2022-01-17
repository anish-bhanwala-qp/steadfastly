import {v4 as uuid} from 'uuid'
import {DatabaseManager} from 'src/database/DatabaseManager'
import {BlockDataStore} from 'src/database/BlockDataStore'
import {PageBlock} from 'src/types/blocks/PageBlock'
import {BlockType} from 'src/types/BlockType'
import {createBlock} from 'src/types/BlockFactory'

export const connectToTestDb = async (): Promise<[string, DatabaseManager]> => {
  const databaseName = uuid()
  const db = new DatabaseManager()
  await db.connect(databaseName, 1)
  return [databaseName, db]
}

export const populateTestPages = async (
  db: DatabaseManager,
): Promise<PageBlock[]> => {
  const page1 = createBlock<PageBlock>(BlockType.Page)
  page1.properties.title = 'Test page 1'
  await BlockDataStore.insert(db, page1)
  const page2 = createBlock<PageBlock>(BlockType.Page)
  page2.properties.title = 'Test page 2'
  await BlockDataStore.insert(db, page2)

  return [page1, page2]
}
