import * as React from 'react'
import {useQuery} from 'react-query'
import {ErrorBoundary} from 'react-error-boundary'
import {Tr, Td, Switch, Alert, AlertIcon, AlertTitle, AlertDescription, Button} from '@chakra-ui/react'
import Layout from '~/components/layout'
import Table from '~/components/table'

const employeeSheetsTitle = ['Name', 'Job Title', 'Status']

function EmployeeFallback(props) {
  return (
    <Alert status='error' variant='solid' flexDirection='column' alignItems='center' justifyContent='center' textAlign='center'>
      <AlertIcon boxSize='40px' mr={0} />
      <AlertTitle mt={4} fontSize='lg'>
        Something is wrong!
      </AlertTitle>
      <AlertDescription my={1}>{props.error.message}</AlertDescription>
      <Button onClick={props.resetErrorBoundary}>Retry</Button>
    </Alert>
  )
}

function EmployeeLoading() {
  return (
    <Table sheetsTitle={employeeSheetsTitle}>
      <Tr>
        <Td colSpan={3} textAlign='center'>
          Loading...
        </Td>
      </Tr>
    </Table>
  )
}

function EmployeeTable() {
  const {data} = useQuery('/employee')

  return (
    <Table sheetsTitle={employeeSheetsTitle}>
      {data.map(employee => (
        <Tr key={employee.id}>
          <Td>{employee.name}</Td>
          <Td>{employee.job_title}</Td>
          <Td>
            <Switch defaultChecked={employee.status} />
          </Td>
        </Tr>
      ))}
    </Table>
  )
}

export default function EmployeeScreen() {
  return (
    <Layout title='Employee'>
      <ErrorBoundary FallbackComponent={EmployeeFallback}>
        <React.Suspense fallback={<EmployeeLoading />}>
          <EmployeeTable />
        </React.Suspense>
      </ErrorBoundary>
    </Layout>
  )
}
