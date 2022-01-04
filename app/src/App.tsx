import React from 'react'
import styles from './App.module.css'
import {Header} from './components/header/Header'

const checkCompatibility = () => {
  if (!('serviceWorker' in navigator)) {
    return <h1>Your browser doesn't support ServiceWorkers.</h1>
  }

  if (!window.indexedDB) {
    return <h1>Your browser doesn't support a stable version of IndexedDB.</h1>
  }
}

function App() {
  const compatibilityError = checkCompatibility()

  if (compatibilityError) return compatibilityError

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}></div>
    </div>
  )
}

export default App
