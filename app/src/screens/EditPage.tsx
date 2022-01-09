import React from 'react'
import {useParams} from 'react-router-dom'
import {useDb} from 'src/providers/DbProvider'
import {PageDataStore} from '../db/PageDataStore'
import {Page} from '../types/Page'

export const EditPage: React.FC = () => {
  const params = useParams()
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [page, setPage] = React.useState<Page | undefined>()
  const db = useDb()

  React.useEffect(() => {
    if (!params.id) {
      setIsLoading(false)
      setPage(undefined)
      return
    }
    PageDataStore.getById(db, params.id).then(p => setPage(p))
  }, [db, params.id])

  if (!isLoading) return <div>Loading...</div>
  if (!page) return <h1>Page not found</h1>

  return (
    <div>
      id: {page.id} <br />
      <input type="text" value={page.title} placeholder="Untitled" />
    </div>
  )
}
