import * as React from 'react'
import {Flex, FormControl, FormLabel, Input, Button, useToast} from '@chakra-ui/react'
import {ArrowForwardIcon} from '@chakra-ui/icons'
import {useAuth} from '~/context/auth-context'
import useAsync from '~/utils/hooks/use-async'

export function AuthLoginForm() {
  const {login} = useAuth()
  const {run, error, isError, isLoading} = useAsync(login)
  const toast = useToast({
    status: 'error',
    position: 'bottom-right',
    duration: 5000,
    isClosable: true,
  })

  React.useEffect(() => {
    if (isError) {
      toast({title: 'Oops', description: error})
    }
  }, [isError, error])

  function handleSubmit(event) {
    event.preventDefault()

    const {email, password} = event.target.elements

    run({
      email: email.value,
      password: password.value,
    })
  }

  return (
    <Flex as='form' direction='column' gridGap='4' onSubmit={handleSubmit}>
      <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input variant='filled' name='email' placeholder='Email address' autoComplete='email' autoCapitalize='off' autoCorrect='off' autoFocus />
      </FormControl>

      <FormControl id='password' isRequired>
        <FormLabel>Password</FormLabel>
        <Input variant='filled' name='password' placeholder='Your password' autoComplete='off' autoCapitalize='off' autoCorrect='off' />
      </FormControl>

      <Button type='submit' rightIcon={<ArrowForwardIcon />} isLoading={isLoading}>
        Login
      </Button>
    </Flex>
  )
}
