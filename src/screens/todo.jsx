import * as React from 'react'
import {Box, Heading, Flex, Checkbox, Input, Button, List, ListItem, Text} from '@chakra-ui/react'
import {useTodo, todosSelector, addTodoSelector, removeTodoSelector} from '~/store/todo'

function TodoForm() {
  const addTodo = useTodo(addTodoSelector)

  function hanndleSubmit(event) {
    event.preventDefault()

    const newTitle = event.target.elements.title.value
    addTodo(newTitle)

    event.target.reset()
  }

  return (
    <Flex as='form' gridGap='2' onSubmit={hanndleSubmit}>
      <Input variant='filled' name='title' placeholder='What need to be done?' isRequired />
      <Button type='submit'>Save</Button>
    </Flex>
  )
}

function RemoveTodo(props) {
  const removeTodo = useTodo(removeTodoSelector)

  return <Checkbox onChange={() => removeTodo(props.id)} />
}

function TodoList() {
  const todos = useTodo(todosSelector)

  return (
    <List mt='2'>
      {todos.map(val => (
        <ListItem key={val.id} display='flex' alignItems='center' gridGap='2'>
          <RemoveTodo id={val.id} />
          <Text as='span'>{val.title}</Text>
        </ListItem>
      ))}
    </List>
  )
}

export default function TodoScreen() {
  return (
    <Box>
      <Heading>Todo</Heading>
      <TodoForm />
      <TodoList />
    </Box>
  )
}
