import styles from './Nav.module.css'

interface Props {
  show: boolean
}

export const Nav: React.FC<Props> = ({show}: Props) => {
  return (
    <nav style={{left: show ? 0 : '-200px'}} className={styles.container}></nav>
  )
}
