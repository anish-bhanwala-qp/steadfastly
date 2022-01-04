import React from 'react'
import {Nav} from '../nav/Nav'
import styles from './Header.module.css'

export const Header = () => {
  const [showNav, setShowNav] = React.useState<boolean>(false)
  const handleToggleNav = () => {
    setShowNav(!showNav)
  }

  return (
    <>
      <header className={styles.header}>
        <button onClick={handleToggleNav}>Nav</button>
        <span className={styles.name}>Steadfastly</span>
      </header>
      <Nav show={showNav} />
    </>
  )
}
