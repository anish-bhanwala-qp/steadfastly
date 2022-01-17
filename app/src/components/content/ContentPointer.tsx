import React from 'react'
import {Link} from 'react-router-dom'

interface Props {
  pageId: string
  displayText?: string
}

export const ContentPointer: React.FC<Props> = ({
  pageId,
  displayText,
  ...props
}) => {
  return (
    <div>
      <Link to={`/pages/${pageId}`}>{displayText || 'Untitled'}</Link>
    </div>
  )
}
