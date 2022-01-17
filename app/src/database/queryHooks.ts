import {useQuery, UseQueryResult} from 'react-query'
import {queryClient} from 'src/providers/AppProviders'
import {useDb} from 'src/providers/DbProvider'
import {PageBlock} from 'src/types/blocks/PageBlock'
import {BlockType} from 'src/types/BlockType'
import {BlockDataStore} from './BlockDataStore'

export const usePagesQuery = (): UseQueryResult<PageBlock[]> => {
  const db = useDb()

  return useQuery(['pages'], () =>
    BlockDataStore.getAllByType(db, BlockType.Page),
  )
}

export const invalidatePagesQuery = (): void => {
  queryClient.invalidateQueries(['pages'])
}

export const usePageQuery = (
  id: string,
): UseQueryResult<PageBlock | undefined> => {
  const db = useDb()

  return useQuery(['page', id], () => BlockDataStore.getById(db, id))
}

export const invalidatePageQuery = (id: string): Promise<void> =>
  queryClient.invalidateQueries(['page', id])
