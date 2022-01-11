import React from 'react'
import {AddChildBlockButton} from 'src/components/addBlock/AddChildBlockButton'
import {BlockContents} from 'src/components/blocks/BlockContents'
import {PageContainer} from 'src/components/container/PageContainer'
import {PageTitle} from 'src/components/pageTitle/PageTitle'
import {PageProvider} from 'src/providers/PageProvider'

export const PageScreen: React.FC = () => {
  return (
    <PageProvider>
      <PageContainer>
        <PageTitle />
        <BlockContents />
        <AddChildBlockButton />
      </PageContainer>
    </PageProvider>
  )
}
