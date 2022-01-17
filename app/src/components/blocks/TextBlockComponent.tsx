import React from 'react'
import {BlockDataStore} from 'src/database/BlockDataStore'
import {useDb} from 'src/providers/DbProvider'
import {TextBlock} from 'src/types/blocks/TextBlock'
import {Contenteditable} from '../contenteditable/Contenteditable'

interface Props {
  textBlock: TextBlock
}

export const TextBlockComponent: React.FC<Props> = ({textBlock}) => {
  const db = useDb()
  const handleUpdateText = (text: string): void => {
    BlockDataStore.updateById(db, textBlock.id, {
      ...textBlock!,
      properties: {...textBlock.properties, text},
      updatedAt: new Date(),
    })
  }
  return (
    <Contenteditable
      onChange={handleUpdateText}
      element="div"
      placeholder="Enter text"
      data-testid="text-block"
    >
      {textBlock.properties.text}
    </Contenteditable>
  )
}
