import {persist} from 'zustand/middleware'
import createStore from '~/utils/create-store'
import {uuidv4} from '~/utils/misc'

export const useTodo = createStore(
  persist(
    set => ({
      todos: [],
      addTodo: title => {
        const newTodo = {
          id: uuidv4(),
          title,
        }

        set(prevState => ({
          todos: [...prevState.todos, newTodo],
        }))
      },
      removeTodo: id => {
        set(prevState => {
          const newTodos = prevState.todos.filter(val => val.id !== id)

          return {todos: newTodos}
        })
      },
    }),
    {
      name: 'react-sample:todo',
    },
  ),
)

export default useTodo
