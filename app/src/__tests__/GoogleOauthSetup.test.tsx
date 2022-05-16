import {
  customRender,
  userEvent,
  waitForLoadingToFinish,
} from 'src/test/TestUtil'
import App from 'src/App'
import {cleanup, screen} from '@testing-library/react'
import {connectToTestDb} from 'src/test/TestDbUtil'
import {BackupDataStore} from 'src/database/BackupDataStore'
import {BackupType} from 'src/models/BackupType'
import {redirectTo} from 'src/utils/redirectUtil'
import {GOOGLE_OAUTH_STATE} from 'src/backups/googleDrive/GoogleDriveSetup'

jest.mock('../utils/redirectUtil', () => {
  return {
    redirectTo: jest.fn(),
  }
})

describe('Google Oauth setup flow', () => {
  test('add Google Oauth client Id and submitting redirects to Google for Authentication', async () => {
    const [databaseName, databaseManager] = await connectToTestDb()
    const existingBackup = await BackupDataStore.findByType(
      databaseManager,
      BackupType.GOOGLE,
    )
    // check backup is not setup already
    expect(existingBackup).toBeUndefined()

    customRender(<App />, {
      databaseName,
    })
    await waitForLoadingToFinish()

    const addBackupBtn = screen.getByRole('link', {name: 'Add Backup'})

    userEvent.click(addBackupBtn)

    screen.getByRole('heading', {name: 'Setup Google Drive Backup'})

    // Fill and submit form
    const clientIdInput = screen.getByLabelText('Client ID')
    userEvent.type(clientIdInput, 'some-client-id')
    expect(clientIdInput).toHaveValue('some-client-id')

    const submitBtn = screen.getByRole('button', {name: 'Save'})
    userEvent.click(submitBtn)
    expect(submitBtn).toBeDisabled()

    // redirect_uri is undefined as it's not set in .env.test
    const expectedRedirectUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${'some-client-id'}&redirect_uri=undefined&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.file&state=steadfastly_google_oauth&include_granted_scopes=true&response_type=token`
    expect(redirectTo as jest.Mock).toHaveBeenCalledWith(expectedRedirectUrl)

    const accessToken = 'test-token'
    const callbackUrl = `/google-oauth?#access_token=${accessToken}&state=${GOOGLE_OAUTH_STATE}`

    // Unmount the app and mount the app on the Google callback URL
    cleanup()
    customRender(<App />, {
      route: callbackUrl,
      databaseName,
    })

    // Wait for setup screen
    await screen.findByRole('heading', {name: 'Setting up Google backup'})

    // wait for home screen
    await screen.findByRole('heading', {name: /get started/i})

    // check if backup is setup
    const newBackup = await BackupDataStore.findByType(
      databaseManager,
      BackupType.GOOGLE,
    )
    expect(newBackup).toBeDefined()

    // The add backup button should be hidden now
    const addBackupBtnAfter = screen.queryByRole('link', {name: 'Add Backup'})
    expect(addBackupBtnAfter).not.toBeInTheDocument()

    databaseManager.close()
  })
})
