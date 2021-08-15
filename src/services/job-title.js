import {useQuery} from 'react-query'

export function useJobTitleList(options = {}) {
  const {data, ...queryResult} = useQuery('job-title', options)

  return {
    jobTitles: data,
    ...queryResult,
  }
}
