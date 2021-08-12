import * as React from 'react'
import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import {BrowserRouter as Router} from 'react-router-dom'

const chakraTheme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
})

export default function AppProviders(props) {
  return (
    <ChakraProvider theme={chakraTheme} resetCSS>
      <Router>{props.children}</Router>
    </ChakraProvider>
  )
}
