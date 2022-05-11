import {
  render,
  userEvent,
  screen,
  waitFor,
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

const goToHomePage = (): void => {
  const homeLink = screen.getByRole('link', {name: /steadfastly/i})
  userEvent.click(homeLink)
}

describe('Page screen', () => {
  test('User can edit title and changes are reflected on the home screen', async () => {
    await addPageAndNavigateToPage()

    const titleBlock = screen.getByPlaceholderText('Untitled')
    userEvent.type(titleBlock, 'Test Page')

    expect(screen.getByText('Test Page')).toBeInTheDocument()

    goToHomePage()

    await waitFor(() => {
      screen.getByRole('heading', {name: 'Your Pages'})
    })

    expect(screen.getByText('Test Page')).toBeInTheDocument()
  })

  test('User can add text block to the page', async () => {
    await addPageAndNavigateToPage()

    expect(screen.getByPlaceholderText('Untitled')).toBeInTheDocument()

    const addTextButton = screen.getByRole('button', {name: 'Add text'})
    userEvent.click(addTextButton)

    // Wait for text block to be added
    await waitFor(() => screen.getByTestId('text-block'))
    const textBlock = screen.getByTestId('text-block')
    userEvent.type(textBlock, 'Test text block')
    expect(textBlock).toHaveTextContent('Test text block')
  })

  test('User can add page block to the page and clicking it navigates to the page', async () => {
    await addPageAndNavigateToPage()

    // We are changing page title as child page will be 'Untitled'
    const pageTitle = screen.getByPlaceholderText('Untitled')
    userEvent.type(pageTitle, 'Test page')

    const addPageButton = screen.getByRole('button', {name: 'Add page'})
    userEvent.click(addPageButton)

    // Wait for text block to be added
    const newPageLink = await waitFor(() =>
      screen.getByRole('link', {name: 'Untitled'}),
    )

    userEvent.click(newPageLink)

    await waitForLoadingToFinish()

    screen.getByPlaceholderText('Untitled')
  })
})
