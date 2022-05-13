import React from 'react'
import {redirectTo} from 'src/utils/redirectUtil'

const OAUTH_2_ENDPOINT = 'https://accounts.google.com/o/oauth2/v2/auth'
const redirectUri = process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT_URI!

export const GOOGLE_OAUTH_STATE = 'steadfastly_google_oauth'

export const GoogleDriveSetup: React.FC = () => {
  const [clientId, setClientId] = React.useState<string | undefined>()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<unknown>()

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()

    setError(undefined)

    if (!clientId) {
      console.error('ClientId is required but was: ' + clientId)
      return
    }

    const params = {
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: 'https://www.googleapis.com/auth/drive.file',
      state: GOOGLE_OAUTH_STATE,
      include_granted_scopes: 'true',
      response_type: 'token',
    }

    setLoading(true)
    redirectTo(OAUTH_2_ENDPOINT + '?' + new URLSearchParams(params))
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <h1>Setup Google Drive Backup</h1>
      {error && `Oops something went wrong. (${(error as Error).message})`}
      <div>
        <label htmlFor="clientId">Client ID</label>
        <input
          type="text"
          id="clientId"
          required
          onChange={(e): void => setClientId(e.target.value)}
        />
      </div>
      <div>
        <button type="submit" disabled={loading}>
          Save
        </button>
      </div>
    </form>
  )
}
