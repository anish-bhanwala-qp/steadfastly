import React from 'react'
import {useDb} from 'src/providers/DbProvider'
import {Block} from 'src/types/Block'
import { BlockType } from 'src/types/BlockType'
import {BlockDataStore} from '../db/BlockDataStore'
import {WelcomeScreen} from './WelcomeScreen'

export const HomeScreen: React.FC = () => {
  const db = useDb()
  const [loading, setLoading] = React.useState<boolean>(false)
  const [pages, setPages] = React.useState<Block[]>([])

  React.useEffect(() => {
    BlockDataStore.getAllByType(db, BlockType.Page)
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
