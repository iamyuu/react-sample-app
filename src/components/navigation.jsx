import * as React from 'react'
import {Flex, Heading, Link} from '@chakra-ui/react'

export default function Navigation() {
  return (
    <Flex as='header' alignItems='center' py='4'>
      <Heading display='inline-block' flexGrow={1}>
        React App
      </Heading>

      <Flex as='nav' gridGap='2' fontWeight='semibold' fontSize='2xl'>
        <Link href='/todo'>Todo</Link>
      </Flex>
    </Flex>
  )
}
