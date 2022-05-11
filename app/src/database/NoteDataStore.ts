import {TableName} from '../types/TablesName'
import {DatabaseManager} from './DatabaseManager'
import {NoteModel} from 'src/models/NoteModel'

export class NoteDataStore {
  static create(db: DatabaseManager): void {
    const objectStore = db
      .instance()
      .createObjectStore(this.getTableName(), {keyPath: 'id'})
    // Allow searching by title
    //TODO: check if things work fine even if title is not present in properties
    objectStore.createIndex('title', 'title', {unique: false})
    objectStore.createIndex('content', 'content', {unique: false})
  }

  static getTableName(): TableName {
    return TableName.Notes
  }

  static async insert(db: DatabaseManager, note: NoteModel): Promise<void> {
    await db.insert<NoteModel>(this.getTableName(), note)
  }

  static findById(
    db: DatabaseManager,
    id: string,
  ): Promise<NoteModel | undefined> {
    return db.findById(this.getTableName(), id)
  }

  static findAll(db: DatabaseManager): Promise<NoteModel[]> {
    return db.findAll<NoteModel>(this.getTableName())
  }

  static updateById(
    db: DatabaseManager,
    id: string,
    note: NoteModel,
  ): Promise<void> {
    return db.updateById<NoteModel>(this.getTableName(), id, note)
  }
}
