import {
  render as renderInternal,
  RenderResult,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {ReactElement} from 'react'
import {TestAppProviders} from './TestAppProviders'

async function render(
  ui: ReactElement,
  {
    route = '/',

    ...renderOptions
  }: {route?: string; rest?: any[]} = {},
): Promise<RenderResult> {
  window.history.pushState({}, 'Test page', `#${route}`)
  const returnValue = {
    ...renderInternal(ui, {
      wrapper: TestAppProviders as any,
      ...renderOptions,
    }),
  }

  // wait for react-query to settle before allowing the test to continue
  // await waitForLoadingToFinish();

  return returnValue
}

const waitForLoadingToFinish = (): Promise<void> =>
  waitForElementToBeRemoved(() => [...screen.queryAllByText(/loading/i)], {
    timeout: 4000,
  })

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
  render,
  screen,
  userEvent,
  waitForLoadingToFinish,
  waitForSavingToFinish,
}
