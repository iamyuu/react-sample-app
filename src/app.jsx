import * as React from 'react'
import {Container} from '@chakra-ui/react'
import {useRoutes, Navigate} from 'react-router-dom'
import AppProviders from './context'
import Navigation from './components/navigation'
import TodoScreen from './screens/todo'
import NotFoundScreen from './screens/not-found'

function AppRoutes() {
  // return (
  //   <Routes>
  //     <Route path='/' element={<Navigate to='/todo' replace />} />
  //     <Route path='/todo' element={<TodoScreen />} />
  //     <Route path='*' element={<NotFoundScreen />} />
  //   </Routes>
  // )

  return useRoutes([
    {
      path: '/',
      element: <Navigate to='/todo' replace />,
    },
    {
      path: '/todo',
      element: <TodoScreen />,
    },
    {
      path: '*',
      element: <NotFoundScreen />,
    },
  ])
}

export default function App() {
  return (
    <AppProviders>
      <Container maxW='container.lg'>
        <Navigation />

        <main>
          <AppRoutes />
        </main>
      </Container>
    </AppProviders>
  )
}
