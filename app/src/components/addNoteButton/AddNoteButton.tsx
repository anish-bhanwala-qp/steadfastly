import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useAddNoteMutation} from 'src/api/notesApi'

export const AddNoteButton: React.FC = () => {
  const navigate = useNavigate()
  const addNoteMutation = useAddNoteMutation()

  if (addNoteMutation.error) throw addNoteMutation.error

  const handleAddNote = async (): Promise<void> => {
    const note = await addNoteMutation.mutateAsync()
    navigate(`/notes/${note.id}`)
  }

  const loading = addNoteMutation.isLoading

  return (
    <button disabled={loading} onClick={handleAddNote}>
      {loading ? 'Loading...' : 'Add Note'}
    </button>
  )
}
