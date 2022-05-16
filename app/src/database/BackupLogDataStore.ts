import {TableName} from 'src/types/TablesName'
import {DatabaseManager} from 'src/database/DatabaseManager'
import {BackupLogModel} from 'src/models/BackupLogModel'

export class BackupLogDataStore {
  static create(db: DatabaseManager): void {
    // type serves as primary key. So each backup type always has one row only.
    const objectStore = db
      .instance()
      .createObjectStore(this.getTableName(), {keyPath: 'id'})

    objectStore.createIndex('type', 'type', {unique: false})
  }

  static getTableName(): TableName {
    return TableName.BackupLogs
  }

  static async insert(
    db: DatabaseManager,
    backupLog: BackupLogModel,
  ): Promise<void> {
    await db.insert<BackupLogModel>(this.getTableName(), backupLog)
  }

  static update(db: DatabaseManager, backup: BackupLogModel): Promise<void> {
    return db.update<BackupLogModel>(this.getTableName(), backup)
  }
}
