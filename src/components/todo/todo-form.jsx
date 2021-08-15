import * as React from 'react'
import {Flex, Input, Button} from '@chakra-ui/react'
import {useTodo, addTodoSelector} from '~/store/todo'

export function TodoForm() {
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
