import {Block} from '../types/Block'
import {TableName} from '../types/TablesName'
import {DatabaseManager} from './DatabaseManager'
import {BlockType} from 'src/types/BlockType'

export class BlockDataStore {
  static create(db: DatabaseManager): void {
    const objectStore = db
      .instance()
      .createObjectStore(TableName.Block, {keyPath: 'id'})
    // Allow searching by title
    //TODO: check if things work fine even if title is not present in properties
    objectStore.createIndex('title', 'properties.title', {unique: false})
    objectStore.createIndex('type', 'type', {unique: false})
  }

  static async insert<T extends Block>(
    db: DatabaseManager,
    block: T,
  ): Promise<void> {
    await db.insert<T>(TableName.Block, block)
  }

  static getById<T extends Block>(
    db: DatabaseManager,
    id: string,
  ): Promise<T | undefined> {
    return db.findById(TableName.Block, id)
  }

  static getAllByType<T extends Block>(
    db: DatabaseManager,
    type: BlockType,
  ): Promise<T[]> {
    return db.getAllByIndex<T>(TableName.Block, 'type', type)
  }

  static updateById(
    db: DatabaseManager,
    id: string,
    block: Block,
  ): Promise<void> {
    return db.updateById<Block>(TableName.Block, id, block)
  }
}
