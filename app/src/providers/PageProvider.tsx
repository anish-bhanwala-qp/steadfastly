import React from 'react'
import {useParams} from 'react-router-dom'
import {PageDataStore} from 'src/db/PageDataStore'
import {Page} from 'src/types/Page'
import {useDb} from './DbProvider'

interface PageContextValue {
  page?: Page
  onUpdateTitle(title: string): void
}

const PageContext = React.createContext<PageContextValue>({
  onUpdateTitle: () => {},
})

export const PageProvider: React.FC = ({children}) => {
  const params = useParams()
  const db = useDb()
  const [loading, setLoading] = React.useState(true)
  const [page, setPage] = React.useState<Page | undefined>()

  React.useEffect(() => {
    if (!params.id) {
      setLoading(false)
      setPage(undefined)
      return
    }
    PageDataStore.getById(db, params.id)
      .then(p => setPage(p))
      .then(() => setLoading(false))
  }, [db, params.id])

  const onUpdateTitle = React.useCallback(
    (title: string) => {
      PageDataStore.updateById(db, page!.id, {...page!, title})
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
