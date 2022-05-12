import {
  customRender,
  userEvent,
  screen,
  waitFor,
  waitForLoadingToFinish,
  waitForSavingToFinish,
} from 'src/test/TestUtil'
import App from 'src/App'
import {connectToTestDb} from 'src/test/TestDbUtil'

const addNoteAndNavigateToNote = async (): Promise<{databaseName: string}> => {
  const [databaseName] = await connectToTestDb()
  customRender(<App />, {databaseName})

  await waitForLoadingToFinish()

  const addButton = screen.getByRole('button', {name: /add note/i})
  userEvent.click(addButton)
  await waitForLoadingToFinish()

  await screen.findByPlaceholderText('Enter title')

  return {databaseName}
}

const goToHomePage = (): void => {
  const homeLink = screen.getByRole('link', {name: /steadfastly/i})
  userEvent.click(homeLink)
}

describe('Note screen', () => {
  test('User can edit title and updated title is reflected on the home screen', async () => {
    await addNoteAndNavigateToNote()

    const titleBlock = screen.getByPlaceholderText('Enter title')
    userEvent.type(titleBlock, 'Test Note')
    await waitFor(() => expect(titleBlock).toHaveValue('Test Note'))

    await waitForSavingToFinish()

    goToHomePage()

    await screen.findByRole('heading', {name: 'Your Notes'})

    expect(screen.getByText('Test Note')).toBeInTheDocument()
  })
})
