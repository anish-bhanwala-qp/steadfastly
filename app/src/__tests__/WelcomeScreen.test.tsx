import {
  render,
  userEvent,
  screen,
  waitFor,
  waitForLoadingToFinish,
} from 'src/test/TestUtil'
import App from 'src/App'

describe('Welcome screen', () => {
  beforeEach(() => {
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
})
