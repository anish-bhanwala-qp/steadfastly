import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {DbProvider} from 'src/providers/DbProvider'

interface Props extends React.PropsWithChildren {
  databaseName: string
}

export const TestAppProviders: React.FC<Props> = ({databaseName, children}) => {
  return (
    <DbProvider databaseName={databaseName} databaseVersion={1} testEnv={true}>
      <Router>{children}</Router>
    </DbProvider>
  )
}
