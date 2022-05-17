import React from 'react'
import {Link} from 'react-router-dom'
import {useAppStore} from 'src/providers/AppStoreProvider'
import {useDb} from 'src/providers/DbProvider'
import {useStore} from 'zustand'
import {Nav} from '../nav/Nav'
import styles from './Header.module.css'

export const Header: React.FC = () => {
  const backup = useStore(useAppStore(), state => state.backup)
  const appStore = useStore(useAppStore(), state => state)
  const backupManager = useStore(useAppStore(), state => state.backupManager)
  const db = useDb()
  const [showNav, setShowNav] = React.useState<boolean>(false)
  const handleToggleNav = (): void => {
    setShowNav(!showNav)
  }

  const handleStartBackup = (): void => {
    backupManager?.startBackup(db, appStore)
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          <button onClick={handleToggleNav}>Nav</button>
          <Link to="/" className={styles.name}>
            Steadfastly
          </Link>
        </div>
        <div className={styles.right}>
          {!backup && <Link to="add-backups">Add Backup</Link>}
          {backup && <button onClick={handleStartBackup}>Start backup</button>}
        </div>
      </header>
      <Nav show={showNav} />
    </>
  )
}
