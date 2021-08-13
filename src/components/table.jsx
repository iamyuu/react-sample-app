import * as React from 'react'
import {Table as ChakraTable, Thead, Tfoot, Tr, Th} from '@chakra-ui/react'

export default function Table(props) {
  return (
    <ChakraTable variant='simple'>
      <Thead>
        <Tr>
          {props.header.map(val => (
            <Th key={val}>{val}</Th>
          ))}
        </Tr>
      </Thead>
      {props.children}
      <Tfoot>
        <Tr>
          {props.header.map(val => (
            <Th key={val}>{val}</Th>
          ))}
        </Tr>
      </Tfoot>
    </ChakraTable>
  )
}
