import { Layout } from '@components/layout'
import { Login } from '@components/login'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Page = () => {
  const router = useRouter()

  const { slug } = router.query

  const renderTemplate = () => {
    switch (slug) {
      default:
        return <Login />
    }
  }
  return <Layout> {renderTemplate()}</Layout>
}

export default Page
