import {v4 as uuid} from 'uuid'
import {Db} from 'src/db/Db'
import {BlockDataStore} from 'src/db/BlockDataStore'
import {PageBlock} from 'src/types/blocks/PageBlock'
import {BlockType} from 'src/types/BlockType'
import {createBlock} from 'src/types/BlockFactory'

export const connectToTestDb = async (): Promise<[string, Db]> => {
  const databaseName = uuid()
  const db = new Db()
  await db.connect(databaseName, 1)
  return [databaseName, db]
}

export const populateTestPages = async (db: Db): Promise<PageBlock[]> => {
  const page1 = createBlock<PageBlock>(BlockType.Page)
  page1.properties.title = 'Test page 1'
  await BlockDataStore.insert(db, page1)
  const page2 = createBlock<PageBlock>(BlockType.Page)
  page2.properties.title = 'Test page 2'
  await BlockDataStore.insert(db, page2)

  return [page1, page2]
}
