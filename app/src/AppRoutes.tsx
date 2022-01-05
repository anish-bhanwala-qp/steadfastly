import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import {WelcomeScreen} from './screens/WelcomeScreen'

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
      </Routes>
    </Router>
  )
}
