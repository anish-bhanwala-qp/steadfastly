import {Routes, Route} from 'react-router-dom'
import {PageScreen} from './screens/PageScreen'
import {WelcomeScreen} from './screens/WelcomeScreen'

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/pages/:id" element={<PageScreen />} />
    </Routes>
  )
}
