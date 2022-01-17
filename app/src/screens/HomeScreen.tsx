import React from 'react'
import {Link} from 'react-router-dom'
import {usePagesQuery} from 'src/database/queryHooks'
import {WelcomeScreen} from './WelcomeScreen'

export const HomeScreen: React.FC = () => {
  const {data, error, isLoading} = usePagesQuery()

  if (error) throw error
  if (isLoading) return <div>Loading...</div>

  const pages = data!

  if (pages.length === 0) return <WelcomeScreen />

  return (
    <div>
      <h1>Your Pages</h1>
      <ul>
        {pages.map(page => (
          <li key={page.id}>
            <Link to={`/pages/${page.id}`}>{page.properties.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
