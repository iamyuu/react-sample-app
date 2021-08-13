import * as React from 'react'
import {Box, Heading} from '@chakra-ui/react'

export default function Layout(props) {
  return (
    <Box>
      <Heading as='header' my='4'>
        {props.title}
      </Heading>
      <main>{props.children}</main>
    </Box>
  )
}
