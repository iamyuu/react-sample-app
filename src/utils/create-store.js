import create from 'zustand'
import {devtools} from 'zustand/middleware'

const createStore = store => {
  if (import.meta.env.DEV) {
    return create(devtools(store))
  }

  return create(store)
}

export default createStore
