import * as React from 'react'
import {Text} from '@chakra-ui/react'
import Layout from '~/components/layout'

export default function NotFoundScreen() {
  return (
    <Layout title='404'>
      <Text>Please double check the URL entered and try again.</Text>
    </Layout>
  )
}
