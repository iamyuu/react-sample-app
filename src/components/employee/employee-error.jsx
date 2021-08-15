import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {Alert, AlertIcon, AlertTitle, AlertDescription, Button} from '@chakra-ui/react'

export function EmployeeFallback(props) {
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

export function EmployeeErrorBoundary(props) {
  return <ErrorBoundary FallbackComponent={EmployeeFallback} {...props} />
}
