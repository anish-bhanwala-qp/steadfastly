import React from 'react'
import {LoadingState} from 'src/models/LoadingState'

export const useAsync = <T,>(
  asyncFunction: () => Promise<T>,
  immediate = true,
): {
  execute: () => Promise<void>
  status: LoadingState
  value: T | null
  error: unknown
} => {
  const [status, setStatus] = React.useState<LoadingState>(LoadingState.PENDING)
  const [value, setValue] = React.useState<T | null>(null)
  const [error, setError] = React.useState<unknown | null>(null)
  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = React.useCallback(() => {
    setStatus(LoadingState.LOADING)
    setValue(null)
    setError(null)
    return asyncFunction()
      .then((response: T) => {
        setValue(response)
        setStatus(LoadingState.DONE)
      })
      .catch(error => {
        setError(error)
        setStatus(LoadingState.ERROR)
      })
  }, [asyncFunction])
  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.
  React.useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])
  return {execute, status, value, error}
}
