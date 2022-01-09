import React from 'react'
import {HashRouter as Router} from 'react-router-dom'
import {CompatibilityProvider} from './CheckCompatibility'
import {DbProvider} from './DbProvider'

const databaseName = process.env.REACT_APP_DB_NAME!
const databaseVersion = +process.env.REACT_APP_DB_VERSION!

export const AppProviders: React.FC = ({children}) => {
  return (
    <CompatibilityProvider>
      <DbProvider databaseName={databaseName} databaseVersion={databaseVersion}>
        <Router>{children}</Router>
      </DbProvider>
    </CompatibilityProvider>
  )
}
