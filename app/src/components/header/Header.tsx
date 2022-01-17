import React from 'react'
import {Link} from 'react-router-dom'
import {Nav} from '../nav/Nav'
import styles from './Header.module.css'

export const Header: React.FC = () => {
  const [showNav, setShowNav] = React.useState<boolean>(false)
  const handleToggleNav = (): void => {
    setShowNav(!showNav)
  }

  return (
    <>
      <header className={styles.header}>
        <button onClick={handleToggleNav}>Nav</button>
        <Link to="/" className={styles.name}>
          Steadfastly
        </Link>
      </header>
      <Nav show={showNav} />
    </>
  )
}
