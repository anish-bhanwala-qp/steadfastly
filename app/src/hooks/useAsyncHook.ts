import {useCallback, useState} from 'react'

export type UseAsyncState<T> = {
  data: T | undefined
  error: boolean
  isPending: boolean
  isSuccess: boolean
  isLoading: boolean
}

/**
 * Returns a current execution state of an async function.
 * Use it to orchestrate async actions in UI.
 */
export function useAsyncCallback<Args extends unknown[], ResolvedType>(
  callback: (...args: Args) => Promise<ResolvedType>,
): [UseAsyncState<ResolvedType>, (...args: Args) => Promise<ResolvedType>] {
  const [isPending, setIsPending] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [data, setData] = useState<ResolvedType>()

  const _callback = useCallback(
    async (...args: Args) => {
      try {
        setIsPending(false)
        setIsLoading(true)
        const results = await callback(...args)
        setData(results)
        setIsSuccess(true)

        return results
      } catch (e) {
        setError(true)
        throw e
      } finally {
        setIsLoading(false)
      }
    },
    [callback],
  )

  return [{data, error, isLoading, isPending, isSuccess}, _callback]
}
