import * as React from 'react'
import {Outlet} from 'react-router-dom'
import BaseLayout from '~/components/layout'

export function EmployeeLayout() {
  return (
    <BaseLayout title='Employee'>
      <Outlet />
    </BaseLayout>
  )
}
