import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useDb} from 'src/providers/DbProvider'
import {PageDataStore} from '../db/PageDataStore'

export const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate()
  const db = useDb()
  const [loading, setLoading] = React.useState<boolean>(false)

  const handleAddPage = async (): Promise<void> => {
    setLoading(true)
    const page = await PageDataStore.addBlank(db)
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
