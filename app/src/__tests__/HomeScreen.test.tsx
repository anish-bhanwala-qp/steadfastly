import {
  customRender,
  userEvent,
  waitForLoadingToFinish,
} from 'src/test/TestUtil'
import App from 'src/App'
import {screen} from '@testing-library/react'
import {connectToTestDb, populateTestNotes} from 'src/test/TestDbUtil'

describe('Welcome screen', () => {
  beforeEach(async () => {
    jest.clearAllMocks()
  })

  test('Renders welcome message and adds new note when add-note button is clicked', async () => {
    customRender(<App />)
    await waitForLoadingToFinish()

    screen.getByRole('heading', {name: /get started/i})
    const addButton = screen.getByRole('button', {name: /add note/i})

    userEvent.click(addButton)

    await waitForLoadingToFinish()

    screen.getByPlaceholderText('Enter title')
  })

  test('Displays note list instead of welcome screen if there are notes and navigates to edit note screen when a note link is clicked', async () => {
    const [databaseName, databaseManager] = await connectToTestDb()
    await populateTestNotes(databaseManager)

    customRender(<App />, {databaseName})
    await waitForLoadingToFinish()

    // check both note links are displayed
    const note1Link = screen.getByRole('link', {
      name: 'Test note 1',
    })
    screen.getByRole('link', {name: 'Test note 2'})

    userEvent.click(note1Link)

    const titleInput = await screen.findByPlaceholderText('Enter title')
    expect(titleInput).toHaveValue('Test note 1')

    databaseManager.close()
  })

  test('Displays add note button even if there are multiple notes and adds a new note on clicking it', async () => {
    const [databaseName, databaseManager] = await connectToTestDb()
    const notes = await populateTestNotes(databaseManager)

    customRender(<App />, {databaseName})
    await waitForLoadingToFinish()

    for (const note of notes) {
      screen.getByRole('link', {name: note.title})
    }

    const addButton = screen.getByRole('button', {name: /add note/i})

    userEvent.click(addButton)

    await waitForLoadingToFinish()

    await screen.findByPlaceholderText('Enter title')

    databaseManager.close()
  })
})
