import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {AppStoreProvider} from 'src/providers/AppStoreProvider'
import {DbProvider} from 'src/providers/DbProvider'

interface Props {
  databaseName: string
}

export const TestAppProviders: React.FC<Props> = ({databaseName, children}) => {
  return (
    <DbProvider databaseName={databaseName} databaseVersion={1} testEnv={true}>
      <AppStoreProvider>
        <Router>{children}</Router>
      </AppStoreProvider>
    </DbProvider>
  )
}
