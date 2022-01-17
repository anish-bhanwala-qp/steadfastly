import {Block} from '../types/Block'
import {TableName} from '../types/TablesName'
import {Db} from './Db'
import {BlockType} from 'src/types/BlockType'

export class BlockDataStore {
  static create(db: Db): void {
    const objectStore = db
      .instance()
      .createObjectStore(TableName.Block, {keyPath: 'id'})
    // Allow searching by title
    //TODO: check if things work fine even if title is not present in properties
    objectStore.createIndex('title', 'properties.title', {unique: false})
    objectStore.createIndex('type', 'type', {unique: false})
  }

  static async insert<T extends Block>(db: Db, block: T): Promise<void> {
    await db.insert<T>(TableName.Block, block)
  }

  static getById<T extends Block>(db: Db, id: string): Promise<T | undefined> {
    return db.getById(TableName.Block, id)
  }

  static getAllByType<T extends Block>(db: Db, type: BlockType): Promise<T[]> {
    return db.getAllByIndex<T>(TableName.Block, 'type', type)
  }

  static updateById(db: Db, id: string, block: Block): Promise<void> {
    return db.updateById<Block>(TableName.Block, id, block)
  }
}
