import React from 'react'
import {usePageContext} from 'src/providers/PageProvider'
import {Contenteditable} from '../contenteditable/Contenteditable'

export const PageTitle: React.FC = () => {
  const {page, onUpdateTitle} = usePageContext()

  return (
    <Contenteditable
      element="h1"
      className="container"
      placeholder="Untitled"
      onChange={onUpdateTitle}
    >
      {page.properties.title}
    </Contenteditable>
  )
}
