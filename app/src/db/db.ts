import {TableName} from '../types/TablesName'
import {PageDataStore} from './PageDataStore'

const databaseName = process.env.REACT_APP_DB_NAME!
const databaseVersion = +process.env.REACT_APP_DB_VERSION!

class Db {
  private db?: IDBDatabase

  instance(): IDBDatabase {
    if (!this.db) throw new Error('Database not yet initialized')
    return this.db!
  }

  private getObjectStore(
    storeName: string,
    mode: IDBTransactionMode,
  ): IDBObjectStore {
    const tx = this.instance().transaction(storeName, mode)
    return tx.objectStore(storeName)
  }

  connect(): Promise<void> {
    console.log(databaseName, databaseVersion)
    const request = indexedDB.open(databaseName, databaseVersion)
    return new Promise<void>((resolve, reject) => {
      request.onerror = (event: any): void => {
        console.log(event)
        reject(event?.target?.errorCode)
      }
      request.onsuccess = (): void => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (): void => {
        this.db = request.result
        PageDataStore.create()
        resolve()
      }
    })
  }

  insert<T>(tableName: TableName, obj: T): Promise<void> {
    const store = this.getObjectStore(tableName, 'readwrite')
    return new Promise<void>((resolve, reject) => {
      let req = store.add(obj)
      req.onsuccess = function (): void {
        resolve()
      }
      req.onerror = function (): void {
        console.error('error', req.error)
        reject(req.error)
      }
    })
  }

  getById<T>(tableName: string, id: string): Promise<T | undefined> {
    const transaction = this.instance().transaction(tableName)
    const objectStore = transaction.objectStore(tableName)
    return new Promise<T>((resolve, reject) => {
      const request = objectStore.get(id)
      request.onerror = function (): void {
        reject(request.error)
      }
      request.onsuccess = function (): void {
        resolve(request.result)
      }
    })
  }
}

export const db = new Db()
