import {Routes, Route} from 'react-router-dom'
import {HomeScreen} from './screens/HomeScreen'
import {NoteScreen} from './screens/note/NoteScreen'

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/notes/:id" element={<NoteScreen />} />
    </Routes>
  )
}
