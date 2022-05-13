import {TableName} from 'src/types/TablesName'
import {DatabaseManager} from 'src/database/DatabaseManager'
import {BackupModel} from 'src/models/BackupModel'
import {BackupType} from 'src/models/BackupType'

export class BackupDataStore {
  static create(db: DatabaseManager): void {
    // type serves as primary key. So each backup type always has one row only.
    db.instance().createObjectStore(this.getTableName(), {keyPath: 'type'})
  }

  static getTableName(): TableName {
    return TableName.Backup
  }

  static async insert(db: DatabaseManager, backup: BackupModel): Promise<void> {
    await db.insert<BackupModel>(this.getTableName(), backup)
  }

  static findByType(
    db: DatabaseManager,
    type: BackupType,
  ): Promise<BackupModel | undefined> {
    return db.findById<BackupModel>(this.getTableName(), type)
  }

  static update(db: DatabaseManager, backup: BackupModel): Promise<void> {
    return db.update<BackupModel>(this.getTableName(), backup)
  }
}
