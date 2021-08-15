import * as React from 'react'
import Table from '~/components/table'
import {employeeSheetsTitle} from './employee-table'

export function EmployeeTableLoading() {
  return <Table isLoading sheetsTitle={employeeSheetsTitle} />
}

export function EmployeeTableSuspense(props) {
  return <React.Suspense fallback={<EmployeeTableLoading />} {...props} />
}
