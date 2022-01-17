import React from 'react'
import {useParams} from 'react-router-dom'
import {BlockDataStore} from 'src/database/BlockDataStore'
import {createBlock} from 'src/types/BlockFactory'
import {PageBlock} from 'src/types/blocks/PageBlock'
import {BlockType} from 'src/types/BlockType'
import {useDb} from './DbProvider'

interface PageContextValue {
  page?: PageBlock
  onUpdateTitle(title: string): void
  onAddBlock(blockType: BlockType): void
}

const PageContext = React.createContext<PageContextValue>({
  onUpdateTitle: () => {},
  onAddBlock: () => {},
})

export const PageProvider: React.FC = ({children}) => {
  const params = useParams()
  const db = useDb()
  const [loading, setLoading] = React.useState(true)
  const [page, setPage] = React.useState<PageBlock | undefined>()

  React.useEffect(() => {
    if (!params.id) {
      setLoading(false)
      setPage(undefined)
      return
    }
    BlockDataStore.getById<PageBlock>(db, params.id)
      .then(p => setPage(p))
      .then(() => setLoading(false))
  }, [db, params.id])

  const onUpdateTitle = React.useCallback(
    (title: string) => {
      BlockDataStore.updateById(db, page!.id, {
        ...page!,
        properties: {title},
        updatedAt: new Date(),
      })
    },
    [db, page],
  )

  const onAddBlock = React.useCallback(
    async (blockType: BlockType) => {
      const newBlock = createBlock(blockType)
      const oldContents = page!.contents || []
      const contents = [...oldContents, newBlock.id]
      const updatedPage = {
        ...page!,
        contents,
        updatedAt: new Date(),
      }

      await BlockDataStore.insert(db, newBlock)
      setPage(updatedPage)
      await BlockDataStore.updateById(db, page!.id, updatedPage)
    },
    [db, page],
  )

  const value = React.useMemo(
    () => ({page, onUpdateTitle, onAddBlock}),
    [page, onUpdateTitle, onAddBlock],
  )

  if (loading) return <div>Loading...</div>
  if (!page) return <h1>Page not found</h1>

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>
}

export const usePage = (): {
  page: PageBlock
} & Exclude<PageContextValue, 'page'> => {
  const context = React.useContext(PageContext)
  if (context === undefined) {
    throw new Error(`usePage must be used within a PageProvider`)
  }

  if (!context.page) {
    throw new Error(`Page not found`)
  }

  return context as any
}
