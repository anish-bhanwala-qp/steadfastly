import {DatabaseManager} from 'src/database/DatabaseManager'

export interface BackupManager {
  init(): Promise<void>
  remove(): Promise<void>

  startBackup(db: DatabaseManager): Promise<void>
}
