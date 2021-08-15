import * as React from 'react'
import {QueryClient, QueryClientProvider as RQProvider} from 'react-query'
import httpClient from '~/utils/http-client'

function useConstant(initializer) {
  return React.useState(initializer)[0]
}

export function QueryClientProvider({children}) {
  const queryClient = useConstant(() => {
    const client = new QueryClient({
      defaultOptions: {
        queries: {
          suspense: true,
          useErrorBoundary: true,
          queryFn: ({queryKey}) => {
            return httpClient(`/${queryKey.join('/')}`)
          },
          retry: (failureCount, error) => {
            if (error.status === 404) return false
            else if (failureCount < 2) return true
            else return false
          },
        },
        mutations: {
          onError: (err, variables, recover) => {
            if (typeof recover === 'function') {
              recover()
            }
          },
        },
      },
    })
    window.__devtools?.setQueryClient?.(client)
    return client
  })

  return <RQProvider client={queryClient}>{children}</RQProvider>
}
