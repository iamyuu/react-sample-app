import * as React from 'react'
import {AuthUnauthorized} from './auth-unauthorized'
import {useAuth} from '~/context/auth-context'

export function AuthProtectedScreen(props) {
  const {isAuth} = useAuth()

  if (isAuth) {
    return props.children
  }

  return <AuthUnauthorized />
}
