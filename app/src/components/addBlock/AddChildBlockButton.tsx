import React from 'react'
import {useAddBlockToPageMutation} from 'src/database/mutationHooks'
import {usePageContext} from 'src/providers/PageProvider'
import {BlockType} from 'src/types/BlockType'

interface Props {
  blockType: BlockType
}

export const AddChildBlockButton: React.FC<Props> = ({blockType}) => {
  const {page} = usePageContext()
  const addBlockToPageMutation = useAddBlockToPageMutation()

  const handleAddTextBlock = (): void => {
    addBlockToPageMutation.mutate({page, blockType: BlockType.Text})
  }

  const handleAddPageBlock = (): void => {
    addBlockToPageMutation.mutate({page, blockType: BlockType.Page})
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
