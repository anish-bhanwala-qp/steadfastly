import React from 'react'
import styles from './FullPageSpinner.module.css'

interface Props {
  text?: string
}

export const FullPageSpinner: React.FC<Props> = ({text}) => {
  return <div className={styles.container}>{text || 'Loading...'}</div>
}
