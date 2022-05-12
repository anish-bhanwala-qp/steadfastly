import {
  render as renderInternal,
  RenderResult,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {v4 as uuid} from 'uuid'
import {ReactElement} from 'react'
import {TestAppProviders} from './TestAppProviders'

async function customRender(
  ui: ReactElement,
  {
    route = '/',
    databaseName = uuid(),
    ...renderOptions
  }: {
    route?: string
    databaseName?: string
    rest?: unknown[]
  } = {},
): Promise<RenderResult> {
  window.history.pushState({}, 'Test page', `${route}`)
  const options = {...renderOptions}

  const returnValue = {
    ...renderInternal(ui, {
      wrapper: props => (
        <TestAppProviders databaseName={databaseName}>
          {props.children}
        </TestAppProviders>
      ),
      ...options,
    }),
  }

  // wait for react-query to settle before allowing the test to continue
  // await waitForLoadingToFinish();

  return returnValue
}

const waitForLoadingToFinish = async (): Promise<void> => {
  await waitFor(() => screen.getByText(/loading/i))

  // In case already done loading, return
  if (!screen.queryByText(/loading/i)) return

  await waitForElementToBeRemoved(
    () => [...screen.queryAllByText(/loading/i)],
    {
      timeout: 4000,
    },
  )
}

const waitForSavingToFinish = (): Promise<void> =>
  waitForElementToBeRemoved(
    () => [
      ...screen.queryAllByLabelText(/saving/i),
      ...screen.queryAllByText(/saving/i),
    ],
    {timeout: 4000},
  )

export * from '@testing-library/react'
export {
  customRender,
  screen,
  userEvent,
  waitForLoadingToFinish,
  waitForSavingToFinish,
}
