import React from 'react'
import styles from './PageWrapper.module.css'

export const PageWrapper: React.FC = ({children}) => {
  return <div className={styles.container}>{children}</div>
}
