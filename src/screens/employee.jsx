import * as React from 'react'
import {EmployeeErrorBoundary, EmployeeTableSuspense, EmployeeTable} from '~/components/employee'

export default function EmployeeScreen() {
  return (
    <EmployeeErrorBoundary>
      <EmployeeTableSuspense>
        <EmployeeTable />
      </EmployeeTableSuspense>
    </EmployeeErrorBoundary>
  )
}
