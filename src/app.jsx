import * as React from 'react'
import {ChakraProvider, extendTheme, Container} from '@chakra-ui/react'
import Navigation from './components/navigation'
import TodoScreen from './screens/todo'

const chakraTheme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
})

const property = {
  imageUrl: 'https://bit.ly/2Z4KKcF',
  imageAlt: 'Rear view of modern home with pool',
  beds: 3,
  baths: 2,
  title: 'Modern home in city center in the heart of historic Los Angeles',
  formattedPrice: '$1,900.00',
  reviewCount: 34,
  rating: 4,
}

function App() {
  return (
    <ChakraProvider theme={chakraTheme} resetCSS>
      <Container maxW='container.lg'>
        <Navigation />

        <main>
          <TodoScreen />
        </main>
      </Container>
    </ChakraProvider>
  )
}

export default App
