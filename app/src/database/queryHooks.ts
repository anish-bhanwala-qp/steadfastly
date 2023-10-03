import {useDb} from 'src/providers/DbProvider'
import {PageBlock} from 'src/types/blocks/PageBlock'
import {BlockType} from 'src/types/BlockType'
import {BlockDataStore} from './BlockDataStore'
import {UseAsyncState, useAsyncCallback} from 'src/hooks/useAsyncHook'
import React from 'react'

export const usePagesQuery = (): UseAsyncState<PageBlock[]> => {
  const db = useDb()

  const [state, callback] = useAsyncCallback(() =>
    BlockDataStore.getAllByType<PageBlock>(db, BlockType.Page),
  )

  React.useEffect(() => {
    callback()
  }, [])

  return state
}

export const usePageQuery = (
  id: string,
): UseAsyncState<PageBlock | undefined> => {
  const db = useDb()

  const [state, callback] = useAsyncCallback(() =>
    BlockDataStore.getById<PageBlock>(db, id),
  )

  React.useEffect(() => {
    callback()
  }, [id])

  return state
}
