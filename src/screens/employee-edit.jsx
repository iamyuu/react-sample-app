import * as React from 'react'
import {useParams} from 'react-router-dom'
import {Spinner} from '@chakra-ui/react'
import {EmployeeErrorBoundary} from '~/components/employee'
import {EmployeeFormEdit} from '~/components/employee/form/employee-edit'

export default function EmployeeEditScreen() {
  const {employeeId} = useParams()

  return (
    <EmployeeErrorBoundary resetKeys={[employeeId]}>
      <React.Suspense fallback={<Spinner size='xl' display='block' mx='auto' mt='4' />}>
        <EmployeeFormEdit employeeId={employeeId} />
      </React.Suspense>
    </EmployeeErrorBoundary>
  )
}
