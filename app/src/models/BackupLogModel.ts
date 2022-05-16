import {BackupStatus} from './BackupStatus'
import {BackupType} from './BackupType'

export interface BackupLogModel {
  id: string
  type: BackupType
  status: BackupStatus
  createdAt: Date
  updatedAt: Date
}
