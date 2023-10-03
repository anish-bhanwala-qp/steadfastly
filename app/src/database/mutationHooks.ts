import {useDb} from 'src/providers/DbProvider'
import {createBlock} from 'src/types/BlockFactory'
import {PageBlock} from 'src/types/blocks/PageBlock'
import {BlockType} from 'src/types/BlockType'
import {BlockDataStore} from './BlockDataStore'
import {UseAsyncState, useAsyncCallback} from 'src/hooks/useAsyncHook'

interface AddBlockToPageReq {
  page: PageBlock
  blockType: BlockType
}

export const useAddBlockToPageMutation = (): [
  UseAsyncState<PageBlock>,
  (data: AddBlockToPageReq) => void,
] => {
  const db = useDb()

  return useAsyncCallback<AddBlockToPageReq[], PageBlock>(
    async (req: AddBlockToPageReq) => {
      const {blockType, page} = req
      const newBlock = createBlock(blockType)
      const oldContents = page.contents || []
      const contents = [...oldContents, newBlock.id]
      const updatedPage = {
        ...page!,
        contents,
        updatedAt: new Date(),
      }

      await BlockDataStore.insert(db, newBlock)
      await BlockDataStore.updateById(db, page!.id, updatedPage)

      return updatedPage
    },
  )
}

export const useAddPageMutation = (): [
  UseAsyncState<PageBlock>,
  () => void,
] => {
  const db = useDb()

  return useAsyncCallback(async () => {
    const page = createBlock<PageBlock>(BlockType.Page)
    await BlockDataStore.insert(db, page)
    return page
  })
}
