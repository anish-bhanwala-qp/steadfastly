import {useMutation, UseMutationResult, useQueryClient} from 'react-query'
import {useDb} from 'src/providers/DbProvider'
import {createBlock} from 'src/types/BlockFactory'
import {PageBlock} from 'src/types/blocks/PageBlock'
import {BlockType} from 'src/types/BlockType'
import {BlockDataStore} from './BlockDataStore'
import {invalidatePageQuery, invalidatePagesQuery} from './queryHooks'

interface AddBlockToPageReq {
  page: PageBlock
  blockType: BlockType
}

export const useAddBlockToPageMutation = (): UseMutationResult<
  void,
  Error,
  AddBlockToPageReq
> => {
  const queryClient = useQueryClient()
  const db = useDb()

  return useMutation<void, Error, AddBlockToPageReq, PageBlock>(
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

      queryClient.setQueryData(['page', page.id], updatedPage)

      await BlockDataStore.insert(db, newBlock)
      await BlockDataStore.updateById(db, page!.id, updatedPage)
    },
    {
      onError: (error, req) => {
        console.error(error)
        invalidatePageQuery(req.page.id)
      },
    },
  )
}

export const useAddPageMutation = (): UseMutationResult<
  PageBlock,
  Error,
  void
> => {
  const db = useDb()

  return useMutation<PageBlock, Error, void>(async (): Promise<PageBlock> => {
    const page = createBlock<PageBlock>(BlockType.Page)
    await BlockDataStore.insert(db, page)
    invalidatePagesQuery()

    return page
  })
}
