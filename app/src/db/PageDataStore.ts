import {Page} from '../types/Page'
import {TableName} from '../types/TablesName'
import {db} from './db'

let id = 1

export class PageDataStore {
  static create(): void {
    const objectStore = db
      .instance()
      .createObjectStore('pages', {keyPath: 'id'})
    // Allow searching by title
    objectStore.createIndex('title', 'title', {unique: false})
  }

  static async insert(page: Page): Promise<void> {
    await db.insert<Page>(TableName.Pages, page)
  }

  static async addBlank(): Promise<Page> {
    const page: Page = {
      id: `${id++}`,
    }

    await this.insert(page)

    return page
  }

  static getById(id: string): Promise<Page | undefined> {
    return db.getById(TableName.Pages, id)
  }
}
