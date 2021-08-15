import * as React from 'react'
import {Tr, Td, Switch} from '@chakra-ui/react'
import Table from '~/components/table'
import {useEmployeeList, useEmployeeChangeStatus} from '~/services/employee'

export const employeeSheetsTitle = ['Name', 'Job Title', 'Status']

function EmployeeEmptyState() {
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
