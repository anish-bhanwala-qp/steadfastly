import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useAddPageMutation} from 'src/database/mutationHooks'

export const AddPageButton: React.FC = () => {
  const navigate = useNavigate()
  const [state, addPage] = useAddPageMutation()

  if (state.error) throw state.error

  const handleAddPage = async (): Promise<void> => {
    const page = addPage()
    // navigate(`/pages/${page.id}`)
  }

  const loading = state.isLoading

  return (
    <button disabled={loading} onClick={handleAddPage}>
      {loading ? 'Loading...' : 'Add Page'}
    </button>
  )
}
