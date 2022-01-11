import React from 'react'
import {useParams} from 'react-router-dom'
import {BlockDataStore} from 'src/db/BlockDataStore'
import {Block} from 'src/types/Block'
import {useDb} from './DbProvider'

interface PageContextValue {
  page?: Block
  onUpdateTitle(title: string): void
}

const PageContext = React.createContext<PageContextValue>({
  onUpdateTitle: () => {},
})

export const PageProvider: React.FC = ({children}) => {
  const params = useParams()
  const db = useDb()
  const [loading, setLoading] = React.useState(true)
  const [page, setPage] = React.useState<Block | undefined>()

  React.useEffect(() => {
    if (!params.id) {
      setLoading(false)
      setPage(undefined)
      return
    }
    BlockDataStore.getById(db, params.id)
      .then(p => setPage(p))
      .then(() => setLoading(false))
  }, [db, params.id])

  const onUpdateTitle = React.useCallback(
    (title: string) => {
      console.log('on updaste property is called')
      BlockDataStore.updateById(db, page!.id, {
        ...page!,
        properties: {title: title},
        updatedAt: new Date(),
        title,
      })
    },
    [db, page],
  )
  const value = React.useMemo(
    () => ({page, onUpdateTitle}),
    [page, onUpdateTitle],
  )

  if (loading) return <div>Loading...</div>
  if (!page) return <h1>Page not found</h1>

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>
}

export const usePage = (): PageContextValue => {
  const context = React.useContext(PageContext)
  if (context === undefined) {
    throw new Error(`usePage must be used within a PageProvider`)
  }

  if (!context.page) {
    throw new Error(`Page not found`)
  }

  return context
}
