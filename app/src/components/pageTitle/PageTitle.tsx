import React from 'react'
import {usePage} from 'src/providers/PageProvider'
import {Contenteditable} from '../contenteditable/Contenteditable'

export const PageTitle: React.FC = () => {
  const {page, onUpdateTitle} = usePage()

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
