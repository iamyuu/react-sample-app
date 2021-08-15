import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {Tr, Td, Switch, Alert, AlertIcon, AlertTitle, AlertDescription, Button, Text} from '@chakra-ui/react'
import Layout from '~/components/layout'
import Table from '~/components/table'
import {useEmployeeList, useEmployeeChangeStatus} from '~/services/employee'

const employeeSheetsTitle = ['Name', 'Job Title', 'Status']

function EmployeeEmptyState() {
  return (
    <Text fontSize='lg' textAlign='center' mt='4'>
      Employee is empty
    </Text>
  )
}

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
  const {data} = useEmployeeList()
  const mutationStatus = useEmployeeChangeStatus()

  const handleChangeStatus = employeeId => event => {
    mutationStatus.mutate({employeeId, newStatus: event.currentTarget.checked})
  }

  if (data.length < 1) {
    return <EmployeeEmptyState />
  }

  return (
    <Table sheetsTitle={employeeSheetsTitle}>
      {data.map(employee => (
        <Tr key={employee.id}>
          <Td>{employee.name}</Td>
          <Td>{employee.job_title}</Td>
          <Td>
            <Switch defaultChecked={employee.status} isDisabled={mutationStatus.isLoading} onChange={handleChangeStatus(employee.id)} />
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
