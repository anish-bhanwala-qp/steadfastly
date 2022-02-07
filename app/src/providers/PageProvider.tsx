import React from 'react'
import {useParams} from 'react-router-dom'
import {FullPageSpinner} from 'src/components/spinner/FullPageSpinner'
import {BlockDataStore} from 'src/database/BlockDataStore'
import {usePageQuery} from 'src/database/queryHooks'
import {PageBlock} from 'src/types/blocks/PageBlock'
import {useDb} from './DbProvider'

interface PageContextValue {
  page?: PageBlock
  onUpdateTitle(title: string): void
}

const PageContext = React.createContext<PageContextValue>({
  onUpdateTitle: () => {},
})

export const PageProvider: React.FC = ({children}) => {
  const params = useParams()
  const db = useDb()
  const {error, data, isLoading} = usePageQuery(params.id!)

  if (error) throw error

  const page = data

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

  const value = React.useMemo(
    () => ({page, onUpdateTitle}),
    [page, onUpdateTitle],
  )

  if (isLoading) return <FullPageSpinner />
  if (!page) return <h1>Page not found</h1>

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>
}

export const usePageContext = (): {
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
