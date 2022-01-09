import React from 'react'
import styles from './App.module.css'
import {AppRoutes} from './AppRoutes'
import {Header} from './components/header/Header'

const App: React.FC = () => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <AppRoutes />
      </div>
    </div>
  )
}

export default App
