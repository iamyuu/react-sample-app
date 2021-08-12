import createStore from '~/utils/create-store'
import {uuidv4} from '~/utils/misc'

export const useTodo = createStore(set => ({
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
}))

export default useTodo
