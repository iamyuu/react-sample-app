import * as React from 'react'
import {Alert, AlertTitle, Button} from '@chakra-ui/react'
import {LockIcon} from '@chakra-ui/icons'

const message = {
  title: 'Unauthorized',
  description: 'This page needs authorization, seems you forgot to log in or your session has been expired.',
}

export function AuthUnauthorized() {
  return (
    <Alert status='error' flexDirection='column' alignItems='center' justifyContent='center' textAlign='center'>
      <LockIcon boxSize='40px' mr={0} />
      <AlertTitle flex='1'>{message.title}</AlertTitle>
      <AlertDescription maxWidth='sm'>{message.description}</AlertDescription>
      <Button variant='ghost'>Log in</Button>
    </Alert>
  )
}
