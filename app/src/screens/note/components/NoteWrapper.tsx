import React from 'react'
import styles from './NoteWrapper.module.css'

export const NoteWrapper: React.FC = ({children}) => {
  return <div className={styles.container}>{children}</div>
}
