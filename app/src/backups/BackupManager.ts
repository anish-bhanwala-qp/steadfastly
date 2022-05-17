import {DatabaseManager} from 'src/database/DatabaseManager'
import {AppStore} from 'src/store/appStore'

export interface BackupManager {
  init(): Promise<void>
  remove(): Promise<void>

  startBackup(db: DatabaseManager, appStore: AppStore): Promise<void>
}
