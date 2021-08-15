import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {useQueryErrorResetBoundary} from 'react-query'
import {Alert, AlertIcon, AlertTitle, IconButton} from '@chakra-ui/react'
import {RepeatIcon} from '@chakra-ui/icons'

export function EmployeeFallback(props) {
  const {reset: resetQuery} = useQueryErrorResetBoundary()

  const handleResetBoundary = () => {
    resetQuery()
    props.resetErrorBoundary()
  }

  return (
    <Alert status='error' display='flex'>
      <AlertIcon />
      <AlertTitle flex='1'>{props.error.message}</AlertTitle>
      <IconButton icon={<RepeatIcon />} aria-label='Retry' onClick={handleResetBoundary} />
    </Alert>
  )
}

export function EmployeeErrorBoundary(props) {
  return <ErrorBoundary FallbackComponent={EmployeeFallback} {...props} />
}
