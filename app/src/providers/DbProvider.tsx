import React from 'react'
import {Db} from 'src/db/Db'

interface Props {
  databaseName: string
  databaseVersion: number
  testEnv?: boolean
}

const DbContext = React.createContext<Db | undefined>(undefined)

export const DbProvider: React.FC<Props> = ({
  children,
  databaseName,
  databaseVersion,
  testEnv,
}) => {
  const dbRef = React.useRef<Db>(new Db())
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    dbRef.current
      .connect(databaseName, databaseVersion)
      .then(() => setLoading(false))

    const db = dbRef.current
    if (testEnv) {
      return (): void => {
        db.deleteDatabase(databaseName)
      }
    }
  }, [databaseName, databaseVersion, testEnv])

  if (loading) return <div>Loading...</div>

  return (
    <DbContext.Provider value={dbRef.current}>{children}</DbContext.Provider>
  )
}

export const useDb = (): Db => {
  const context = React.useContext(DbContext)
  if (context === undefined) {
    throw new Error(`useDb must be used within a DbProvider`)
  }

  return context
}
