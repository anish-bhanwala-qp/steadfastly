import {Routes, Route} from 'react-router-dom'
import {EditPage} from './screens/EditPage'
import {WelcomeScreen} from './screens/WelcomeScreen'

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/pages/:id" element={<EditPage />} />
    </Routes>
  )
}
