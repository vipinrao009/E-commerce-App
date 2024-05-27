import React from 'react'
import Layout from '../../Layout/Layout'
import UserMenu from '../../Layout/UserMenu'

const Profile = () => {
  return (
    <Layout title="Profile">
       <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
           <UserMenu/>
          </div>

          <div className="col-md-6">
            <div className="card p-3">
                <h2>Profile</h2>
            </div>
          </div>
        </div>
        </div>
    </Layout>
  )
}

export default Profile
