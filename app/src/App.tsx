import React from 'react'
import {useStore} from 'zustand'
import styles from './App.module.css'
import {AppRoutes} from './AppRoutes'
import {Header} from './components/header/Header'
import {FullPageSpinner} from './components/spinner/FullPageSpinner'
import {LoadingState} from './models/LoadingState'
import {useAppStore} from './providers/AppStoreProvider'
import {useDb} from './providers/DbProvider'

const App: React.FC = () => {
  const loadingNotes = useStore(useAppStore(), state => state.loadingState)
  const db = useDb()
  const loadNotes = useStore(useAppStore(), state => state.initAppStore)

  React.useEffect(() => {
    loadNotes(db)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (
    loadingNotes === LoadingState.PENDING ||
    loadingNotes === LoadingState.LOADING
  ) {
    return <FullPageSpinner />
  }
  if (loadingNotes === LoadingState.ERROR) {
    throw new Error(`Error loading Notes`)
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
