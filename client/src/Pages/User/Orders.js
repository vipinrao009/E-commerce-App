import React from 'react'
import Layout from '../../Layout/Layout'
import UserMenu from '../../Layout/UserMenu'

const Orders = () => {
  return (
    <Layout title="Orders">
       <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
           <UserMenu/>
          </div>

          <div className="col-md-6">
            <div className="card p-3">
                <h3>All orders</h3>
            </div>
          </div>
        </div>
        </div>
    </Layout>
  )
}

export default Orders
