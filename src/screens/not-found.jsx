import * as React from 'react'
import {Box, Heading, Text} from '@chakra-ui/react'

export default function NotFoundScreen() {
  return (
    <Box textAlign='center'>
      <Heading>404</Heading>
      <Text>Please double check the URL entered and try again.</Text>
    </Box>
  )
}
