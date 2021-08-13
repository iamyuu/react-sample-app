import * as React from 'react'
import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import {BrowserRouter as Router} from 'react-router-dom'
import {QueryClientProvider} from './query-client'

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
        <Router>{props.children}</Router>
      </ChakraProvider>
    </QueryClientProvider>
  )
}
