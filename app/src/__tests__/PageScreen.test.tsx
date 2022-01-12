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

const getPageIdFromUrl = (): string => {
  return window.location.href.split('/').reverse()[0]
}

const goToHomePage = (): string => (window.location.href = '#/')

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

    await addTextBlock()
  })

  test('User can add multiple text blocks to the page', async () => {
    await addPageAndNavigateToPage()
    expect(screen.getByPlaceholderText('Untitled')).toBeInTheDocument()

    await addTextBlock()
    await addTextBlock('another text block')
    
    
  })
})

async function addTextBlock(textBlockContent: string = 'Test text block'): Promise<void> {
  const addTextButton = screen.getByRole('button', { name: 'Add text' })
  userEvent.click(addTextButton)

  // Wait for text block to be added
  await waitFor(() => screen.getByTestId('text-block'))
  const textBlock = screen.getByTestId('text-block')
  userEvent.type(textBlock, textBlockContent)
  expect(textBlock).toHaveTextContent(textBlockContent)
}

