import React from 'react'
import {useAddBlockToPageMutation} from 'src/database/mutationHooks'
import {usePageContext} from 'src/providers/PageProvider'
import {BlockType} from 'src/types/BlockType'

interface Props {
  blockType: BlockType
}

export const AddChildBlockButton: React.FC<Props> = ({blockType}) => {
  const {page} = usePageContext()
  const [state, mutate] = useAddBlockToPageMutation()

  const handleAddTextBlock = (): void => {
    mutate({page, blockType: BlockType.Text})
  }

  const handleAddPageBlock = (): void => {
    mutate({page, blockType: BlockType.Page})
  }

  const renderButton = (): JSX.Element => {
    switch (blockType) {
      case BlockType.Text:
        return (
          <button
            disabled={state.isLoading}
            type="button"
            onClick={handleAddTextBlock}
          >
            Add text
          </button>
        )
      case BlockType.Page:
        return (
          <button
            disabled={state.isLoading}
            type="button"
            onClick={handleAddPageBlock}
          >
            Add page
          </button>
        )
    }
  }

  return renderButton()
}
