import React from 'react'

interface Props {
  text?: string
}

export const Spinner: React.FC<Props> = ({text}) => {
  return <div>{text || 'Loading...'}</div>
}
