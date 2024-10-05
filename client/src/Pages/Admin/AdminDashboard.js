import React from 'react'
import Layout from '../../Layout/Layout'
import AdminMenu from '../../Layout/AdminMenu'
import { useAuth } from '../../Context/auth'

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid p-3">
        <div className="row m-lg-3 d-flex">
          <div className="col-md-3 mt-3 order-2 order-md-0">
            <AdminMenu/>
          </div>
          <div className="col-md-6 ">
            <div className='card mt-lg-4 p-3 '>
              <h4>Name : {auth?.user?.name}</h4>
              <h4>Email : {auth?.user?.email}</h4>
              <h4>Contact : {auth?.user?.phone}</h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard
