import * as React from 'react'
import {Flex, Heading, Link, Badge} from '@chakra-ui/react'
import {useTodo, todosSelector} from '~/store/todo'

function TodoLink() {
  const todos = useTodo(todosSelector)

  return (
    <Link href='/todo' position='relative'>
      Todo
      {todos.length >= 1 ? (
        <Badge rounded='full' position='absolute' top='0' right='-2'>
          {todos.length}
        </Badge>
      ) : null}
    </Link>
  )
}

export default function Navigation() {
  return (
    <Flex as='header' alignItems='center' py='4'>
      <Heading display='inline-block' flexGrow={1}>
        React App
      </Heading>

      <Flex as='nav' gridGap='2' fontWeight='semibold' fontSize='2xl'>
        <TodoLink />
      </Flex>
    </Flex>
  )
}
