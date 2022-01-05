import {TableNames} from '../types/TablesNames'

const databaseName = process.env.REACT_APP_DB_NAME!
const databaseVersion = +process.env.REACT_APP_DB_VERSION!

class Db {
  private db?: IDBDatabase

  instance(): IDBDatabase {
    if (!this.db) throw new Error('Database not yet initialized')
    return this.db!
  }

  private getObjectStore(storeName: string, mode: IDBTransactionMode) {
    var tx = this.instance().transaction(storeName, mode)
    return tx.objectStore(storeName)
  }

  connect(): Promise<void> {
    const request = indexedDB.open(databaseName, databaseVersion)
    return new Promise<void>((resolve, reject) => {
      request.onerror = (event: any) => {
        console.log(event)
        reject(event?.target?.errorCode)
      }
      request.onsuccess = event => {
        this.db = request.result
        resolve()
      }
    })
  }

  insert<T>(obj: T): Promise<void> {
    const store = this.getObjectStore(TableNames.Pages, 'readwrite')
    return new Promise<void>((resolve, reject) => {
      let req = store.add(obj)
      req.onsuccess = function () {
        resolve()
      }
      req.onerror = function () {
        console.error('error', req.error)
        reject(req.error)
      }
    })
  }
}

export const db = new Db()
