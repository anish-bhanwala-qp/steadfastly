import React from 'react'
import {HashRouter as Router} from 'react-router-dom'
import {DbProvider} from 'src/providers/DbProvider'
import {v4 as uuid} from 'uuid'

export const TestAppProviders: React.FC = ({children}) => {
  const dbNameRef = React.useRef<string>(uuid())

  return (
    <DbProvider
      databaseName={dbNameRef.current}
      databaseVersion={1}
      testEnv={true}
    >
      <Router>{children}</Router>
    </DbProvider>
  )
}
