import httpClient from '~/utils/http-client'

const storageKey = '__auth_provider_token__'

// TODO: get storage item from cookie using js-cookie

async function getToken() {
  return window.localStorage.getItem(storageKey)
}

function handleUserResponse({user}) {
  window.localStorage.setItem(storageKey, user.token)
  return user
}

function login({username, password}) {
  return httpClient('login', {username, password}).then(handleUserResponse)
}

async function logout() {
  window.localStorage.removeItem(storageKey)
}

export {getToken, login, logout, storageKey}
