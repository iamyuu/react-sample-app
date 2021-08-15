import * as React from 'react'
import {useNavigate} from 'react-router-dom'
import Nope from 'nope-validator'
import {nopeResolver} from '@hookform/resolvers/nope'
import {useForm, useController} from 'react-hook-form'
import {useJobTitleList} from '~/services/job-title'
import {useEmployeeById, useEmployeeUpdate} from '~/services/employee'
import {Flex, FormControl, FormLabel, FormErrorMessage, Input, Select, Button, useToast} from '@chakra-ui/react'
import {EmployeeNotFound} from '~/components/employee/employee-not-found'

const schema = Nope.object().shape({
  name: Nope.string().atLeast(5, 'Please provide a longer name').required('Please provide an employee name'),
  jobTitle: Nope.string().required('Please provide an employee job title'),
})

function SelectJobTitle(props) {
  const {jobTitles} = useJobTitleList()
  const {field, fieldState} = useController({
    control: props.control,
    name: 'jobTitle',
  })

  return (
    <FormControl id='jobTitle' isRequired isInvalid={fieldState.error}>
      <FormLabel>Employee job title</FormLabel>
      <Select variant='filled' {...field}>
        {jobTitles.map(jobTitle => (
          <option key={jobTitle.id} value={jobTitle.id}>
            {jobTitle.name}
          </option>
        ))}
      </Select>
      <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
    </FormControl>
  )
}

export function EmployeeFormEdit(props) {
  const navigate = useNavigate()

  const {employee} = useEmployeeById(props.employeeId)
  const mutationUpdate = useEmployeeUpdate()

  const toast = useToast({position: 'bottom-right'})
  const {register, control, reset, formState, handleSubmit} = useForm({
    mode: 'all',
    resolver: nopeResolver(schema),
  })

  const {errors: formErrors} = formState

  React.useEffect(() => {
    if (employee) {
      reset({
        ...employee,
        jobTitle: employee.job_title.id,
      })
    }
  }, [employee])

  const handleUpdate = handleSubmit(async values => {
    try {
      await mutationUpdate.mutateAsync({
        name: values.name,
        jobTitle: values.jobTitle,
        employeeId: props.employeeId,
      })

      navigate('/employee')
    } catch (error) {
      toast({status: 'error', title: error.message, duration: 5000, isClosable: true})
    }
  })

  if (!employee) {
    return <EmployeeNotFound />
  }

  return (
    <Flex as='form' direction='column' gridGap='4' onSubmit={handleUpdate}>
      <FormControl id='name' isRequired isInvalid={formErrors && formErrors.name}>
        <FormLabel>Employee name</FormLabel>
        <Input variant='filled' placeholder='Employee name' {...register('name')} />
        <FormErrorMessage>{formErrors?.name?.message}</FormErrorMessage>
      </FormControl>

      <SelectJobTitle control={control} />

      <Button type='submit' isLoading={mutationUpdate.isLoading}>
        Save
      </Button>
    </Flex>
  )
}
