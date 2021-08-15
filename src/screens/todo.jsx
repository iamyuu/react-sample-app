import * as React from 'react'
import Layout from '~/components/layout'
import {TodoForm, TodoList} from '~/components/todo'

export default function TodoScreen() {
  return (
    <Layout title='Todo'>
      <TodoForm />
      <TodoList />
    </Layout>
  )
}
