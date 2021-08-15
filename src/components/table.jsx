import * as React from 'react'
import {Table as ChakraTable, Thead, Tbody, Tfoot, Tr, Th, Td} from '@chakra-ui/react'

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
      <Tbody>
        {props.isLoading ? (
          <Tr>
            <Td colSpan={props.sheetsTitle.length} textAlign='center'>
              Loading...
            </Td>
          </Tr>
        ) : (
          props.children
        )}
      </Tbody>
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
