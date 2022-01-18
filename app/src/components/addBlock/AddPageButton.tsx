import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useAddPageMutation} from 'src/database/mutationHooks'

export const AddPageButton: React.FC = () => {
  const navigate = useNavigate()
  const addPageMutation = useAddPageMutation()

  if (addPageMutation.error) throw addPageMutation.error

  const handleAddPage = async (): Promise<void> => {
    const page = await addPageMutation.mutateAsync()
    navigate(`/pages/${page.id}`)
  }

  const loading = addPageMutation.isLoading

  return (
    <button disabled={loading} onClick={handleAddPage}>
      {loading ? 'Loading...' : 'Add Page'}
    </button>
  )
}
