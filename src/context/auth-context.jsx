import * as React from 'react'
import {useQueryClient} from 'react-query'
import {useAsync} from '~/utils/hooks/use-async'
import * as auth from '~/services/auth'
import createContext from '~/utils/create-context'

const [useAuth, AuthContextProvider] = createContext({name: 'Auth'})

async function bootstrapUserData() {
  let user = null

  const token = await auth.getToken()

  if (token) {
    const data = await client('/me', {token})
    user = data.user
  }

  return user
}

function AuthProvider(props) {
  const queryClient = useQueryClient()
  const {data: user, status, error, isLoading, isIdle, isError, isSuccess, run, setData} = useAsync()

  React.useEffect(() => {
    run(bootstrapUserData())
  }, [run])

  const login = React.useCallback(form => auth.login(form).then(user => setData(user)), [setData])

  const logout = React.useCallback(() => {
    auth.logout()
    queryClient.clear()
    setData(null)
  }, [setData])

  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  if (isSuccess) {
    return <AuthContextProvider value={{isAuth: Boolean(user), login, logout}} {...props} />
  }

  throw new Error(`Unhandled status: ${status}`)
}

export {useAuth, AuthProvider}
