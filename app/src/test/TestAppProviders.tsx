import React from 'react'
import {QueryClient, QueryClientProvider} from 'react-query'
import {BrowserRouter as Router} from 'react-router-dom'
import {AppStoreProvider} from 'src/providers/AppStoreProvider'
import {DbProvider} from 'src/providers/DbProvider'

interface Props {
  databaseName: string
}

export const TestAppProviders: React.FC<Props> = ({databaseName, children}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <DbProvider
        databaseName={databaseName}
        databaseVersion={1}
        testEnv={true}
      >
        <AppStoreProvider>
          <Router>{children}</Router>
        </AppStoreProvider>
      </DbProvider>
    </QueryClientProvider>
  )
}
