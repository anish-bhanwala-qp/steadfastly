import React from 'react'
import {usePage} from 'src/providers/PageProvider'
import {BlockType} from 'src/types/BlockType'

export const AddChildBlockButton: React.FC = () => {
  const {onAddBlock} = usePage()
  const handleAddTextBlock = (): void => {
    onAddBlock(BlockType.Text)
  }
  return (
    <button type="button" onClick={handleAddTextBlock}>
      Add text
    </button>
  )
}
