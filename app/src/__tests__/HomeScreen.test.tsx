import {
  render,
  userEvent,
  screen,
  waitFor,
  waitForLoadingToFinish,
} from 'src/test/TestUtil'
import App from 'src/App'
import {connectToTestDb, populateTestPages} from 'src/test/TestDbUtil'

describe('Welcome screen', () => {
  beforeEach(async () => {
    jest.clearAllMocks()
  })

  test('Renders welcome message and adds new page when add-page button is clicked', async () => {
    render(<App />)
    await waitForLoadingToFinish()

    screen.getByRole('heading', {name: /get started/i})
    const addButton = screen.getByRole('button', {name: /add page/i})

    userEvent.click(addButton)

    await waitForLoadingToFinish()

    screen.getByPlaceholderText('Untitled')
  })

  test('Displays page list instead of welcome screen if there are pages and navigates to edit page screen when a page link is clicked', async () => {
    const [databaseName, db] = await connectToTestDb()
    populateTestPages(db)

    render(<App />, {databaseName})
    await waitForLoadingToFinish()

    // check both page links are displayed
    const page1Link = screen.getByRole('link', {
      name: 'Test page 1',
    })
    screen.getByRole('link', {name: 'Test page 2'})

    userEvent.click(page1Link)

    await waitFor(() => {
      screen.getByRole('button', {name: /add text/i})
    })

    db.close()
  })
})
