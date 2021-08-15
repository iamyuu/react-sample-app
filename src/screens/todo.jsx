import * as React from 'react'
import {Flex, Checkbox, Input, Button, List, ListItem, Text} from '@chakra-ui/react'
import Layout from '~/components/layout'
import {useTodo, todosSelector, addTodoSelector, removeTodoSelector} from '~/store/todo'

function TodoEmptyState() {
  return (
    <Text fontSize='lg' textAlign='center' mt='4'>
      Add what you need to be done
    </Text>
  )
}

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

export default function TodoScreen() {
  return (
    <Layout title='Todo'>
      <TodoForm />
      <TodoList />
    </Layout>
  )
}
