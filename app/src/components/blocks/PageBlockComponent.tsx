import React from 'react'
import {PageBlock} from 'src/types/blocks/PageBlock'
import {ContentPointer} from '../content/ContentPointer'

interface Props {
  pageBlock: PageBlock
}

export const PageBlockComponent: React.FC<Props> = ({pageBlock}) => {
  return (
    <ContentPointer
      pageId={pageBlock.id}
      displayText={pageBlock.properties.title}
      data-testid="page-block"
    ></ContentPointer>
  )
}
