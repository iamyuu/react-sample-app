import * as React from 'react'
import {Flex, Badge} from '@chakra-ui/react'
import {useTodo, todosSelector} from '~/store/todo'
import Link from './link'

function TodoLink() {
  const todos = useTodo(todosSelector)

  return (
    <Link to='/todo' position='relative'>
      Todo
      {todos.length >= 1 ? (
        <Badge variant='solid' color='gray.50' bg='blue.400' rounded='full' position='absolute' top='0' right='-2'>
          {todos.length}
        </Badge>
      ) : null}
    </Link>
  )
}

export default function Navigation() {
  return (
    <Flex as='nav' justifyContent='flex-end' gridGap='2' fontWeight='semibold' fontSize='lg' my='4'>
      <Link to='/employee'>Employee</Link>
      <TodoLink />
    </Flex>
  )
}
