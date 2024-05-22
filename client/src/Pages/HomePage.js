import React from 'react'
import Layout from '../Layout/Layout'
import { useAuth } from '../Context/auth'

const HomePage = () => {
  const[auth,setAuth] = useAuth();
  return (
    <Layout title={'Best offers'}>
      <h1>Home Page</h1>
      <pre>{JSON.stringify(auth, null, 2)}</pre>
    </Layout>
  )
}

export default HomePage
