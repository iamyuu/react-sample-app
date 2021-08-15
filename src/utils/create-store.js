import create from 'zustand'
import {devtools} from 'zustand/middleware'
import {pipe} from './misc'

const log = config => (set, get, api) => {
  return config(
    args => {
      const filterState = state =>
        Object.keys(state)
          .filter(key => typeof state[key] !== 'function')
          .reduce((res, key) => Object.assign(res, {[key]: state[key]}), {})

      window.console.groupCollapsed('%c--- logger ---', 'font-weight: bold;')
      window.console.log('%cprev state', 'color: #00AFF8;', filterState(get()))
      set(args)
      window.console.log('%cnext state', 'color: #4AB14D;', filterState(get()))
      window.console.groupEnd()
    },
    get,
    api,
  )
}

const createStore = store => {
  if (import.meta.env.DEV) {
    return pipe(log, devtools, create)(store)
  }

  return create(store)
}

export default createStore
