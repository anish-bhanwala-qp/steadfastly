import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useDb} from 'src/providers/DbProvider'
import {createBlock} from 'src/types/BlockFactory'
import {BlockType} from 'src/types/BlockType'
import {BlockDataStore} from '../db/BlockDataStore'

export const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate()
  const db = useDb()
  const [loading, setLoading] = React.useState<boolean>(false)

  const handleAddPage = async (): Promise<void> => {
    setLoading(true)
    const page = createBlock(BlockType.Page)
    await BlockDataStore.insert(db, page)
    setLoading(false)
    navigate(`/pages/${page.id}`)
  }

  return (
    <div>
      <h1>Get started</h1>
      <button disabled={loading} onClick={handleAddPage}>
        {loading ? 'Loading...' : 'Add Page'}
      </button>
    </div>
  )
}
