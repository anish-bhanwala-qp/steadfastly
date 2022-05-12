import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useAppStore} from 'src/providers/AppStoreProvider'
import {useDb} from 'src/providers/DbProvider'
import {useStore} from 'zustand'

export const AddNoteButton: React.FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<unknown | null>(null)
  const addNote = useStore(useAppStore(), state => state.addNote)
  const db = useDb()

  if (error) throw error

  const handleAddNote = async (): Promise<void> => {
    try {
      setLoading(true)
      const note = await addNote(db)

      navigate(`/notes/${note.id}`)
    } catch (error) {
      setError(error)
    }
  }

  return (
    <button disabled={loading} onClick={handleAddNote}>
      {loading ? 'Loading...' : 'Add Note'}
    </button>
  )
}
