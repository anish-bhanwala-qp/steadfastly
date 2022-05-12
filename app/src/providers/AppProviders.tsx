import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {AppStoreProvider} from './AppStoreProvider'
import {CompatibilityProvider} from './CheckCompatibility'
import {DbProvider} from './DbProvider'

const databaseName = process.env.REACT_APP_DB_NAME!
const databaseVersion = +process.env.REACT_APP_DB_VERSION!

export const AppProviders: React.FC = ({children}) => {
  return (
    <CompatibilityProvider>
      <DbProvider databaseName={databaseName} databaseVersion={databaseVersion}>
        <AppStoreProvider>
          <Router>{children}</Router>
        </AppStoreProvider>
      </DbProvider>
    </CompatibilityProvider>
  )
}
