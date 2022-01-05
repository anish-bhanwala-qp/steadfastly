import {useNavigate} from 'react-router-dom'
import {PageDataStore} from '../db/PageDataStore'

export const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate()
  const handleAddPage = async (): Promise<void> => {
    const page = await PageDataStore.addBlank()
    navigate(`/pages/${page.id}`)
  }

  return (
    <div>
      <h1>Get started</h1>
      <button onClick={handleAddPage}>Add Page</button>
    </div>
  )
}
