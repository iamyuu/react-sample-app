import * as React from 'react'
import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import {BrowserRouter as Router} from 'react-router-dom'
import {QueryClientProvider} from './query-client'
import {AuthProvider} from './auth-context'

const chakraTheme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
})

export default function AppProviders(props) {
  return (
    <QueryClientProvider>
      <ChakraProvider theme={chakraTheme} resetCSS>
        <Router>
          <AuthProvider>{props.children}</AuthProvider>
        </Router>
      </ChakraProvider>
    </QueryClientProvider>
  )
}
