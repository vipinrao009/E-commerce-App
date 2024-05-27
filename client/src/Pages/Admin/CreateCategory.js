import React from 'react'
import Layout from '../../Layout/Layout'
import AdminMenu from '../../Layout/AdminMenu'

const CreateCategory = () => {
  return (
    <Layout title={"Dashboard-create category"}>
        <div className="container-fluid m-3 p-3">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu/>
                </div>

                <div className="col-md-9">
                    <h2>Create Category</h2>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default CreateCategory
