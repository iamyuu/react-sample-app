import * as React from 'react'
import {List, ListItem, Text, Checkbox} from '@chakra-ui/react'
import {useTodoStore, todosSelector, removeTodoSelector} from '~/store/todo'

function TodoEmptyState() {
  return (
    <Text fontSize='lg' textAlign='center' mt='4'>
      Add what you need to be done
    </Text>
  )
}

function RemoveTodo(props) {
  const removeTodo = useTodoStore(removeTodoSelector)
  return <Checkbox onChange={() => removeTodo(props.id)} />
}

export function TodoList() {
  const todos = useTodoStore(todosSelector)

  if (todos.length < 1) {
    return <TodoEmptyState />
  }

  return (
    <List mt='2'>
      {todos.map(val => (
        <ListItem key={val.id} display='flex' alignItems='center' gridGap='2'>
          <RemoveTodo id={val.id} />
          <Text as='span' fontSize='lg'>
            {val.title}
          </Text>
        </ListItem>
      ))}
    </List>
  )
}
