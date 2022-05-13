import {
  customRender,
  userEvent,
  waitForLoadingToFinish,
} from 'src/test/TestUtil'
import App from 'src/App'
import {screen} from '@testing-library/react'
import {connectToTestDb} from 'src/test/TestDbUtil'
import {BackupDataStore} from 'src/database/BackupDataStore'
import {BackupType} from 'src/models/BackupType'
import {redirectTo} from 'src/utils/redirectUtil'

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
      BackupType.Google,
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

    const clientIdInput = screen.getByLabelText('Client ID')
    userEvent.type(clientIdInput, 'some-client-id')
    expect(clientIdInput).toHaveValue('some-client-id')

    const submitBtn = screen.getByRole('button', {name: 'Save'})
    userEvent.click(submitBtn)
    expect(submitBtn).toBeDisabled()

    // redirect_uri is undefined as it's not set in .env.test
    const expectedRedirectUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${'some-client-id'}&redirect_uri=undefined&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.file&state=steadfastly_google_oauth&include_granted_scopes=true&response_type=token`
    expect(redirectTo as jest.Mock).toHaveBeenCalledWith(expectedRedirectUrl)
    databaseManager.close()
  })
})
