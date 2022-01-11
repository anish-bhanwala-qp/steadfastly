import { Block } from '../types/Block'
import { TableName } from '../types/TablesName'
import { Db } from './db'
import { v4 as uuid } from 'uuid'
import { BlockType } from 'src/types/BlockType'

export class BlockDataStore {
  static create(db: Db): void {
    const objectStore = db
      .instance()
      .createObjectStore(TableName.Block, { keyPath: 'id' })
    // Allow searching by title
    //TODO: check if things work fine even if title is not present in properties
    //TODO: do we really need title to be separate property or can it be part of 'properties'??
    objectStore.createIndex('title', 'properties.title', { unique: false })
    objectStore.createIndex('type', 'type', {unique: false})
  }

  static async insert(db: Db, block: Block): Promise<void> {
    await db.insert<Block>(TableName.Block, block)
  }

  static async addBlank(db: Db, type: BlockType): Promise<Block> {
    const block: Block = {
      id: uuid(),
      type: type,
      properties: {'title':'Default Title'},
      createdAt: new Date(),
      updatedAt: new Date()
    }

    await this.insert(db, block)

    return block
  }

  static getById(db: Db, id: string): Promise<Block | undefined> {
    return db.getById(TableName.Block, id)
  }

  static getAllByType(db: Db, type: BlockType): Promise<Block[]> {
    return db.getAllByIndex<Block>(TableName.Block, 'type', type)
  }

  static updateById(db: Db, id: string, block: Block): Promise<void> {
    return db.updateById<Block>(TableName.Block, id, block)
  }
}
