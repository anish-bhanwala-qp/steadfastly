import React from 'react'
import styles from './App.module.css'
import {AppRoutes} from './AppRoutes'
import {Header} from './components/header/Header'
import {FullPageSpinner} from './components/spinner/FullPageSpinner'
import {LoadingState} from './models/LoadingState'
import {useDb} from './providers/DbProvider'
import {useAppStore} from './store/appStore'

const App: React.FC = () => {
  const loadingNotes = useAppStore(state => state.loadingState)
  const db = useDb()
  const loadNotes = useAppStore(state => state.loadNotes)

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
