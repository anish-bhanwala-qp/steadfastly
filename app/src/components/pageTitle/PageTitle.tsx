import React from 'react'
import {usePageContext} from 'src/providers/PageProvider'
import {Contenteditable} from '../content/Contenteditable'

export const PageTitle: React.FC = () => {
  const {page, onUpdateTitle} = usePageContext()

  return (
    <Contenteditable
      element="h1"
      content={page.properties.title}
      className="container"
      placeholder="Untitled"
      onChange={onUpdateTitle}
    />
  )
}
