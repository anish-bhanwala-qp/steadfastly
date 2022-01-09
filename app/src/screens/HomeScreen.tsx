import React from 'react'
import {useDb} from 'src/providers/DbProvider'
import {Page} from 'src/types/Page'
import {PageDataStore} from '../db/PageDataStore'
import {WelcomeScreen} from './WelcomeScreen'

export const HomeScreen: React.FC = () => {
  const db = useDb()
  const [loading, setLoading] = React.useState<boolean>(false)
  const [pages, setPages] = React.useState<Page[]>([])

  React.useEffect(() => {
    PageDataStore.getAll(db)
      .then(setPages)
      .then(() => setLoading(false))
  }, [db])

  if (loading) return <div>Loading...</div>

  if (pages.length === 0) return <WelcomeScreen />

  return (
    <div>
      <h1>Your Pages</h1>
      <ul>
        {pages.map(page => (
          <li key={page.id}>{page.title}</li>
        ))}
      </ul>
    </div>
  )
}
