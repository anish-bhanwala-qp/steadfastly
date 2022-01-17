import React from 'react'
import {useAddBlockToPageMutation} from 'src/database/mutationHooks'
import {usePageContext} from 'src/providers/PageProvider'
import {BlockType} from 'src/types/BlockType'

export const AddChildBlockButton: React.FC = () => {
  const {page} = usePageContext()
  const addTextBlockMutation = useAddBlockToPageMutation()

  if (addTextBlockMutation.error) throw addTextBlockMutation.error

  const handleAddTextBlock = (): void => {
    addTextBlockMutation.mutate({page, blockType: BlockType.Text})
  }

  return (
    <button type="button" onClick={handleAddTextBlock}>
      Add text
    </button>
  )
}
