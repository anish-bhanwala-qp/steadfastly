import React from 'react'
import {useNavigate} from 'react-router-dom'
import {PageBlock} from 'src/types/blocks/PageBlock'
import {ContentPointer} from '../content/ContentPointer'

interface Props {
  pageBlock: PageBlock
}

export const PageBlockComponent: React.FC<Props> = ({pageBlock}) => {
  const navigate = useNavigate()

  const handleClick = (): void => {
    navigate(`/pages/${pageBlock.id}`)
  }

  return (
    <ContentPointer
      onElementClick={handleClick}
      displayText={pageBlock.properties.title}
      data-testid="page-block"
    ></ContentPointer>
  )
}
