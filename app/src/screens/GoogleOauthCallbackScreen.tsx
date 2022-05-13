import React from 'react'
import {useNavigate} from 'react-router-dom'
import {GOOGLE_OAUTH_STATE} from 'src/backups/googleDrive/GoogleDriveSetup'
import {FullPageSpinner} from 'src/components/spinner/FullPageSpinner'
import {useAppStore} from 'src/providers/AppStoreProvider'
import {useDb} from 'src/providers/DbProvider'
import {useStore} from 'zustand'

export const GoogleOauthCallbackScreen: React.FC = () => {
  const [error, setError] = React.useState<string | undefined>()
  const navigate = useNavigate()
  const db = useDb()
  const setupGoogleBackup = useStore(
    useAppStore(),
    state => state.setupGoogleBackup,
  )

  React.useEffect(() => {
    const params = parseCallbackParams()
    const error = params.error
    if (error) {
      // Callback returned error
      setError(error)
      return
    }

    const accessToken = params.access_token
    const state = params.state
    // Callback didn't send access token
    if (!accessToken) {
      setError('Oops, error authenticating with google. (access_token missing)')
      return
    }

    if (state !== GOOGLE_OAUTH_STATE) {
      process.env.NODE_ENV !== 'test' &&
        console.error('Invalid state: ' + state)
      setError('Oops, error authenticating with google. (Invalid state)')
      return
    }

    setupGoogleBackup(db, {accessToken})
      .then(() => navigate('/'))
      .catch(error => setError(error?.message))
  }, [])

  const content = error ? (
    <div>
      <div>{error}</div>
      <div>
        Click <a href="/">here</a> to go back
      </div>
    </div>
  ) : (
    <div>
      <h1>Setting up Google backup</h1>
      <FullPageSpinner />
    </div>
  )

  return <div>{content}</div>
}

// Code taken from: https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow#example
const parseCallbackParams = (): Record<string, string | undefined> => {
  const fragmentString = document.location.hash.substring(1)
  const params: Record<string, string | undefined> = {}
  const regex = /([^&=]+)=([^&]*)/g
  let m
  while ((m = regex.exec(fragmentString))) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2])
  }

  return params
}
