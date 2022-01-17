import {useQuery, UseQueryResult} from 'react-query'
import {queryClient} from 'src/providers/AppProviders'
import {useDb} from 'src/providers/DbProvider'
import {PageBlock} from 'src/types/blocks/PageBlock'
import {BlockType} from 'src/types/BlockType'
import {BlockDataStore} from './BlockDataStore'

export const usePages = (): UseQueryResult<PageBlock[]> => {
  const db = useDb()

  return useQuery(['pages'], () =>
    BlockDataStore.getAllByType(db, BlockType.Page),
  )
}

export const invalidatePages = (): void => {
  queryClient.invalidateQueries(['pages'])
}
