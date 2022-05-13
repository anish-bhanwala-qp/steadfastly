import {
  customRender,
  userEvent,
  waitForLoadingToFinish,
} from 'src/test/TestUtil'
import App from 'src/App'
import {screen} from '@testing-library/react'
import {GOOGLE_OAUTH_STATE} from 'src/backups/googleDrive/GoogleDriveSetup'
import {connectToTestDb} from 'src/test/TestDbUtil'
import {BackupDataStore} from 'src/database/BackupDataStore'
import {BackupType} from 'src/models/BackupType'

describe('GoogleOauthCallback screen', () => {
  test('Google backup is setup if valid access_token and state is in the callback url', async () => {
    const [databaseName, databaseManager] = await connectToTestDb()
    const existingBackup = await BackupDataStore.findByType(
      databaseManager,
      BackupType.Google,
    )
    // check backup is not setup already
    expect(existingBackup).toBeUndefined()

    const accessToken = 'test-token'
    const callbackUrl = `/google-oauth?#access_token=${accessToken}&state=${GOOGLE_OAUTH_STATE}`

    customRender(<App />, {
      route: callbackUrl,
      databaseName,
    })

    await screen.findByRole('heading', {name: 'Setting up Google backup'})
    await waitForLoadingToFinish()

    const newBackup = await BackupDataStore.findByType(
      databaseManager,
      BackupType.Google,
    )
    // check backup is not setup already
    expect(newBackup).toBeDefined()

    databaseManager.close()
  })

  test('Displays error message with go back link, if access_token is missing in the URL', async () => {
    const callbackUrl = `/google-oauth?#state=${GOOGLE_OAUTH_STATE}`

    customRender(<App />, {
      route: callbackUrl,
    })

    await screen.findByRole('heading', {name: 'Setting up Google backup'})

    screen.getByText(
      'Oops, error authenticating with google. (access_token missing)',
    )
    screen.getByRole('link', {name: 'here'})
  })

  test('Displays error message with go back link, if state does not match in the URL', async () => {
    const accessToken = 'test-token'
    const callbackUrl = `/google-oauth?#access_token=${accessToken}&state=invalid`

    customRender(<App />, {
      route: callbackUrl,
    })

    await screen.findByRole('heading', {name: 'Setting up Google backup'})

    screen.getByText('Oops, error authenticating with google. (Invalid state)')
    screen.getByRole('link', {name: 'here'})
  })
})
