import * as React from 'react'
import {Tr, Td, Switch} from '@chakra-ui/react'
import Table from '~/components/table'
import Link from '~/components/link'
import {useEmployeeList, useEmployeeChangeStatus} from '~/services/employee'

export const employeeSheetsTitle = ['Name', 'Job Title', 'Status']

export function EmployeeEmptyState() {
  return (
    <Text fontSize='lg' textAlign='center' mt='4'>
      Employee is empty
    </Text>
  )
}

export function EmployeeTable() {
  const {employees} = useEmployeeList()
  const mutationStatus = useEmployeeChangeStatus()

  const handleChangeStatus = employeeId => event => {
    mutationStatus.mutate({employeeId, newStatus: event.currentTarget.checked})
  }

  if (employees.length < 1) {
    return <EmployeeEmptyState />
  }

  return (
    <Table sheetsTitle={employeeSheetsTitle}>
      {employees.map(employee => (
        <Tr key={employee.id}>
          <Td>
            <Link color='blue.300' fontWeight='semibold' to={`/employee/${employee.id}`}>
              {employee.name}
            </Link>
          </Td>
          <Td>{employee.job_title.name}</Td>
          <Td>
            <Switch defaultChecked={employee.status} isDisabled={mutationStatus.isLoading} onChange={handleChangeStatus(employee.id)} />
          </Td>
        </Tr>
      ))}
    </Table>
  )
}
