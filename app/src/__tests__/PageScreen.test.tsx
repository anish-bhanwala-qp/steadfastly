import {
  render,
  userEvent,
  screen,
  waitForLoadingToFinish,
} from 'src/test/TestUtil'
import App from 'src/App'
import {v4 as uuid} from 'uuid'

const addPageAndNavigateToPage = async (): Promise<{databaseName: string}> => {
  const databaseName = uuid()
  render(<App />, {databaseName})
  await waitForLoadingToFinish()
  const addButton = screen.getByRole('button', {name: /add page/i})
  userEvent.click(addButton)
  await waitForLoadingToFinish()
  screen.getByPlaceholderText('Untitled')

  return {databaseName}
}

const getPageIdFromUrl = (): string => {
  return window.location.href.split('/').reverse()[0]
}

describe('Page screen', () => {
  test('User can edit the page title', async () => {
    await addPageAndNavigateToPage()

    const titleBlock = screen.getByPlaceholderText('Untitled')
    userEvent.type(titleBlock, 'Test Page')

    expect(screen.getByText('Test Page')).toBeInTheDocument()
  })
})
