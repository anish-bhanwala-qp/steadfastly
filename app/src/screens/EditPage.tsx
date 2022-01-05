import React from 'react'
import {useParams} from 'react-router-dom'
import {PageDataStore} from '../db/PageDataStore'
import {Page} from '../types/Page'

export const EditPage: React.FC = () => {
  const params = useParams()
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [page, setPage] = React.useState<Page | undefined>()

  React.useEffect(() => {
    if (!params.id) {
      setIsLoading(false)
      setPage(undefined)
      return
    }
    PageDataStore.getById(params.id).then(p => setPage(p))
  }, [params.id])

  if (!isLoading) return <div>Loading...</div>
  if (!page) return <h1>Page not found</h1>

  return <div>id: {page.id}</div>
}
