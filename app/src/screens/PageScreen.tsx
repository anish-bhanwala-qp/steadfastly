import React from 'react'
import {PageContainer} from 'src/components/container/PageContainer'
import {PageTitle} from 'src/components/pageTitle/PageTitle'
import {PageProvider} from 'src/providers/PageProvider'

export const PageScreen: React.FC = () => {
  return (
    <PageProvider>
      <PageContainer>
        <PageTitle />
      </PageContainer>
    </PageProvider>
  )
}
