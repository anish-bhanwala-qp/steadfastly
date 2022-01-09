import {Routes, Route} from 'react-router-dom'
import {HomeScreen} from './screens/HomeScreen'
import {PageScreen} from './screens/PageScreen'

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/pages/:id" element={<PageScreen />} />
    </Routes>
  )
}
