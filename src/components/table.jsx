import * as React from 'react'
import {Table as ChakraTable, Thead, Tbody, Tfoot, Tr, Th} from '@chakra-ui/react'

export default function Table(props) {
  return (
    <ChakraTable variant='simple'>
      <Thead>
        <Tr>
          {props.sheetsTitle.map(val => (
            <Th key={val}>{val}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>{props.children}</Tbody>
      <Tfoot>
        <Tr>
          {props.sheetsTitle.map(val => (
            <Th key={val}>{val}</Th>
          ))}
        </Tr>
      </Tfoot>
    </ChakraTable>
  )
}
