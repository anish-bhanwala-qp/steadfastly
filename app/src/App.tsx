import React from 'react'
import styles from './App.module.css'
import {AppRoutes} from './AppRoutes'
import {Header} from './components/header/Header'
import {db} from './db/db'

const App: React.FC = () => {
  React.useEffect(() => {
    if (!window.indexedDB) return
    db.connect()
  }, [])

  if (!('serviceWorker' in navigator)) {
    return <h1>Your browser doesn't support ServiceWorkers.</h1>
  }

  if (!window.indexedDB) {
    return <h1>Your browser doesn't support a stable version of IndexedDB.</h1>
  }

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
