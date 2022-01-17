import React from 'react'

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
      <a href={`#/pages/${pageId}`}>{displayText || 'Untitled'}</a>
    </div>
  )
}
