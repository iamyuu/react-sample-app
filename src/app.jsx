import * as React from 'react'
import {Container} from '@chakra-ui/react'
import {useRoutes, Navigate} from 'react-router-dom'
import AppProviders from './context'
import Navigation from './components/navigation'
import TodoScreen from './screens/todo'
import {EmployeeLayout} from './components/employee/employee-layout'
import EmployeeScreen from './screens/employee'
import EmployeeEditScreen from './screens/employee-edit'
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
      element: <EmployeeLayout />,
      children: [
        {
          path: '/',
          element: <EmployeeScreen />,
        },
        {
          path: ':employeeId',
          element: <EmployeeEditScreen />,
        },
      ],
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
