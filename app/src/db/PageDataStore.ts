import {Page} from '../types/Page'
import {TableName} from '../types/TablesName'
import {Db} from './db'
import {v4 as uuid} from 'uuid'

export class PageDataStore {
  static create(db: Db): void {
    const objectStore = db
      .instance()
      .createObjectStore('pages', {keyPath: 'id'})
    // Allow searching by title
    objectStore.createIndex('title', 'title', {unique: false})
  }

  static async insert(db: Db, page: Page): Promise<void> {
    await db.insert<Page>(TableName.Pages, page)
  }

  static async addBlank(db: Db): Promise<Page> {
    const page: Page = {
      id: uuid(),
    }

    await this.insert(db, page)

    return page
  }

  static getById(db: Db, id: string): Promise<Page | undefined> {
    return db.getById(TableName.Pages, id)
  }

  static updateById(db: Db, id: string, page: Page): Promise<void> {
    return db.updateById<Page>(TableName.Pages, id, page)
  }
}
