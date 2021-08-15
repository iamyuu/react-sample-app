import * as React from 'react'
import Layout from '~/components/layout'
import {EmployeeErrorBoundary, EmployeeTableSuspense, EmployeeTable} from '~/components/employee'

export default function EmployeeScreen() {
  return (
    <Layout title='Employee'>
      <EmployeeErrorBoundary>
        <EmployeeTableSuspense>
          <EmployeeTable />
        </EmployeeTableSuspense>
      </EmployeeErrorBoundary>
    </Layout>
  )
}
