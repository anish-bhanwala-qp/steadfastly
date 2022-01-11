import {BlockType} from './BlockType'
import {v4 as uuid} from 'uuid'
import {BlockProperties} from './BlockProperties'
import {Block} from './Block'

export const createBlock = (blockType: BlockType): Block => {
  return {
    id: uuid(),
    type: blockType,
    properties: createDefaultProperties(blockType),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

const createDefaultProperties = (blockType: BlockType): BlockProperties => {
  switch (blockType) {
    case BlockType.Page:
      return {title: ''}
    case BlockType.Text:
      return {text: ''}
  }

  throw new Error(`Unknown blockType: ${blockType}`)
}
