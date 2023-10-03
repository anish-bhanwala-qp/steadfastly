import React from 'react'
import styles from './PageContainer.module.css'

export const PageContainer: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <div className={styles.container}>{children}</div>
}
