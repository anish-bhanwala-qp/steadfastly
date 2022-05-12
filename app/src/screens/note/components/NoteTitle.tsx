import React from 'react'
import styles from './NoteTitle.module.css'

interface Props {
  title?: string
  onChange(title?: string): void
}

export const NoteTitle: React.FC<Props> = ({title, onChange}) => {
  const [value, setValue] = React.useState(title || '')
  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    setValue(e.target.value)
    onChange(e.target.value)
  }

  return (
    <div>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={handleOnChange}
        placeholder="Enter title"
      />
    </div>
  )
}
