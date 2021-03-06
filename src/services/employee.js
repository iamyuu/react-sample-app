import {useQuery, useMutation, useQueryClient} from 'react-query'
import httpClient from '~/utils/http-client'

export function useEmployeeList(options = {}) {
  const {data, ...queryResult} = useQuery('employee', options)

  return {
    employees: data,
    ...queryResult,
  }
}

export function useEmployeeById(employeeId, options = {}) {
  const {data, ...queryResult} = useQuery(`employee/${employeeId}`, options)

  return {
    employee: data,
    ...queryResult,
  }
}

export function useEmployeeUpdate(options = {}) {
  return useMutation(
    updates =>
      httpClient(`/employee/${updates.employeeId}`, {
        method: 'PATCH',
        data: updates,
      }),
    options,
  )
}

export function useEmployeeChangeStatus(options = {}) {
  const queryClient = useQueryClient()

  return useMutation(
    ({employeeId, newStatus}) => {
      return httpClient(`/employee/${employeeId}/change-status`, {
        method: 'PATCH',
        data: {
          status: newStatus,
        },
      })
    },
    {
      onSettled: () => queryClient.invalidateQueries('employee'),
      onMutate: async ({employeeId, newStatus}) => {
        const previousEmployee = queryClient.getQueryData('employee')

        queryClient.setQueryData('employee', old => {
          return old.map(employee => {
            return employee.id === employeeId ? {...employee, status: newStatus} : employee
          })
        })

        return () => queryClient.setQueryData('employee', previousEmployee)
      },
      ...options,
    },
  )
}
