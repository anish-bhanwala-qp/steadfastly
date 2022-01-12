import React from 'react'
import {usePage} from 'src/providers/PageProvider'
import {BlockType} from 'src/types/BlockType'

interface Props {
  blockType: BlockType
}

export const AddChildBlockButton: React.FC<Props> = ({blockType}) => {
  const {onAddBlock} = usePage()

  const handleAddTextBlock = (): void => {
    onAddBlock(BlockType.Text)
  }
  const handleAddPageBlock = (): void => {
    onAddBlock(BlockType.Page)
  }

  const renderButton = (): JSX.Element => {
    switch (blockType) {
      case BlockType.Text:
        return (
          <button type="button" onClick={handleAddTextBlock}>
            Add text
          </button>
        )
      case BlockType.Page:
        return (
          <button type="button" onClick={handleAddPageBlock}>
            Add page
          </button>
        )
    }
  }

  return renderButton()
}
