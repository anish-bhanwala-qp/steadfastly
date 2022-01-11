import {BlockType} from './BlockType'

export interface Block {
  id: string
  type: BlockType
  title?: string
  properties?: object
  contents?: string[]
  createdAt: Date
  updatedAt: Date
}
