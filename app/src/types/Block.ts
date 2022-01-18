import {BlockProperties} from './BlockProperties'
import {BlockType} from './BlockType'

export interface Block {
  id: string
  type: BlockType
  properties: BlockProperties
  contents?: string[]
  createdAt: Date
  updatedAt: Date
}
