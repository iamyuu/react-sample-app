import * as React from 'react'
import useSafeDispatch from './use-safe-dispatch'

const defaultInitialState = {
  data: null,
  error: null,
  status: 'idle',
}

export default function useAsync(fn, initialState) {
  const initialStateRef = React.useRef({
    ...defaultInitialState,
    ...initialState,
  })
  const [{status, data, error}, setState] = React.useReducer((s, a) => ({...s, ...a}), initialStateRef.current)

  const safeSetState = useSafeDispatch(setState)

  const reset = React.useCallback(() => safeSetState(initialStateRef.current), [safeSetState])
  const setData = React.useCallback(data => safeSetState({data, status: 'resolved'}), [safeSetState])
  const setError = React.useCallback(error => safeSetState({error, status: 'rejected'}), [safeSetState])

  const run = React.useCallback(
    (...args) => {
      const promise = fn(...args)

      if (!promise || !promise.then) {
        throw new Error('The first argument passed to `useAsync` must be a promise')
      }

      safeSetState({status: 'pending'})

      return promise.then(
        data => {
          setData(data)
          return data
        },
        error => {
          setError(error)
          return Promise.reject(error)
        },
      )
    },
    [safeSetState, setData, setError],
  )

  return {
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isError: status === 'rejected',
    isSuccess: status === 'resolved',

    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  }
}
