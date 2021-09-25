import * as React from 'react'

export default function createContext(options = {}) {
  const {name, strict = true, errorMessage = `use${name}: context is undefined. Seems you forgot to wrap component within the ${name}Provider`} = options

  const Context = React.createContext(undefined)

  Context.displayName = name

  function useContext() {
    const context = React.useContext(Context)

    if (!context && strict) {
      const error = new Error(errorMessage)
      error.name = 'ContextError'
      Error.captureStackTrace?.(error, useContext)
      throw error
    }

    return context
  }

  return [useContext, Context.Provider, Context]
}
