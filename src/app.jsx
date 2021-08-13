import * as React from 'react'
import {Container} from '@chakra-ui/react'
import {useRoutes, Navigate} from 'react-router-dom'
import AppProviders from './context'
import Navigation from './components/navigation'
import TodoScreen from './screens/todo'
import EmployeeScreen from './screens/employee'
import NotFoundScreen from './screens/not-found'

function AppRoutes() {
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
      path: '/employee',
      element: <EmployeeScreen />,
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
        <AppRoutes />
      </Container>
    </AppProviders>
  )
}
