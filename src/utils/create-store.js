import create from 'zustand'
import {devtools} from 'zustand/middleware'

const log = config => (set, get, api) =>
  config(
    args => {
      console.log('  applying', args)
      set(args)
      console.log('  new state', get())
    },
    get,
    api,
  )

const createStore = store => create(devtools(store))
export default createStore
