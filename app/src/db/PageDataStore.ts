import {db} from './db'

export class PageDataStore {
  static create() {
    const objectStore = db
      .instance()
      .createObjectStore('pages', {keyPath: 'id'})
    // Allow searching by title
    objectStore.createIndex('title', 'title', {unique: false})
  }

  static insert() {
    db.insert
  }
}
