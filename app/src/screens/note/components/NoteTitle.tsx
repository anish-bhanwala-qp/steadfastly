import React from 'react'

interface Props {
  title?: string
  onChange(title?: string): void
}

export const NoteTitle: React.FC<Props> = ({title, onChange}) => {
  const [value, setValue] = React.useState(title || '')
  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    setValue(e.target.value)
    onChange(value)
  }

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleOnChange}
        placeholder="Enter title"
      />
    </div>
  )
}
