import {Routes, Route} from 'react-router-dom'
import {GoogleDriveSetup} from './backups/googleDrive/GoogleDriveSetup'
import {GoogleOauthCallbackScreen} from './screens/GoogleOauthCallbackScreen'
import {HomeScreen} from './screens/HomeScreen'
import {NoteScreen} from './screens/note/NoteScreen'

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/notes/:id" element={<NoteScreen />} />
      <Route path="/google-oauth" element={<GoogleOauthCallbackScreen />} />
      <Route path="/add-backups" element={<GoogleDriveSetup />} />
    </Routes>
  )
}
