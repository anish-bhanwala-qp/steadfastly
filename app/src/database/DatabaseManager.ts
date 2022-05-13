import {TableName} from 'src/types/TablesName'
import {NoteDataStore} from 'src/database/NoteDataStore'
import {BackupDataStore} from './BackupDataStore'

export class DatabaseManager {
  private db?: IDBDatabase

  isConnected(): boolean {
    return !!this.db
  }

  instance(): IDBDatabase {
    if (!this.db) throw new Error('Database not yet initialized')
    return this.db!
  }

  private getObjectStore(
    storeName: TableName,
    mode: IDBTransactionMode,
  ): IDBObjectStore {
    const tx = this.instance().transaction(storeName, mode)
    return tx.objectStore(storeName)
  }

  connect(databaseName: string, databaseVersion: number): Promise<void> {
    const request = indexedDB.open(databaseName, databaseVersion)
    return new Promise<void>((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      request.onerror = (event: any): void => {
        console.log(event)
        reject(event?.target?.errorCode)
      }
      request.onsuccess = (): void => {
        this.db = request.result
        this.db.onclose = (): void => console.log('database closed')
        resolve()
      }

      request.onupgradeneeded = (event): void => {
        this.db = request.result
        this.db.onclose = (): void => console.log('database closed')
        /*  We need to wait for noteDataStore to complete. See below link 
          https://stackoverflow.com/questions/33709976/uncaught-invalidstateerror-failed-to-execute-transaction-on-idbdatabase-a 
        */
        NoteDataStore.create(this)
        BackupDataStore.create(this)

        const tx = request.transaction!

        tx.oncomplete = function (): void {
          // Now store is available to be populated
          resolve()
        }
      }
    })
  }

  close(): void {
    this.instance().close()
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

  /* 
    This method is useful when you don't want all the columns
    to be populated in the result. E.g. if we want only id and 
    title columns and skip content column we can call it like this:
    findAllWithSelectedColumns('notes', ['id', 'title']), which will
    return: [{id, title}, {id, title}].
  */
  findAllWithSelectedColumns<T>(
    tableName: string,
    columns: string[],
  ): Promise<T[]> {
    const transaction = this.instance().transaction(tableName)
    const objectStore = transaction.objectStore(tableName)
    return new Promise<T[]>((resolve, reject) => {
      const list: T[] = []

      const request = objectStore.openCursor()

      request.onsuccess = function (event): void {
        const cursor = request.result
        if (cursor) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const item: any = {}
          columns.forEach(column => (item[column] = cursor.value[column]))

          list.push(item)
          cursor.continue()
        } else {
          resolve(list)
        }
      }
    })
  }

  findAll<T>(tableName: string): Promise<T[]> {
    const transaction = this.instance().transaction(tableName)
    const objectStore = transaction.objectStore(tableName)
    return new Promise<T[]>((resolve, reject) => {
      const list: T[] = []

      const request = objectStore.openCursor()

      request.onsuccess = function (event): void {
        const cursor = request.result
        if (cursor) {
          list.push(cursor.value)
          cursor.continue()
        } else {
          resolve(list)
        }
      }
    })
  }

  findById<T>(tableName: string, id: string): Promise<T | undefined> {
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

  update<T>(tableName: TableName, data: T): Promise<void> {
    const transaction = this.instance().transaction(tableName, 'readwrite')
    const objectStore = transaction.objectStore(tableName)
    return new Promise<void>((resolve, reject) => {
      const request = objectStore.put(data)
      request.onerror = function (): void {
        reject(request.error)
        console.log('updateById failed', request.error)
      }
      request.onsuccess = function (): void {
        resolve()
      }
    })
  }

  deleteDatabase(databaseName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        resolve()
        return
      }

      this.instance().close()
      const deleteRequest = indexedDB.deleteDatabase(databaseName)

      deleteRequest.onerror = function (): void {
        console.log(deleteRequest.error)
        reject(deleteRequest.error)
      }

      deleteRequest.onsuccess = function (): void {
        resolve()
      }
    })
  }

  getAllByIndex<T>(
    tableName: string,
    index: string,
    value: string,
  ): Promise<T[]> {
    const transaction = this.instance().transaction(tableName)
    const objectStoreIndex = transaction.objectStore(tableName).index(index)
    return new Promise<T[]>((resolve, reject) => {
      const list: T[] = []
      const keyValue = IDBKeyRange.only(value)
      const request = objectStoreIndex.openCursor(keyValue)

      request.onsuccess = function (event): void {
        const cursor = request.result
        if (cursor) {
          list.push(cursor.value)
          cursor.continue()
        } else {
          resolve(list)
        }
      }
    })
  }
}
