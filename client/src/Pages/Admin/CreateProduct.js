import React from 'react'
import AdminMenu from '../../Layout/AdminMenu'
import Layout from '../../Layout/Layout'

const CreateProduct = () => {
  return (
    <Layout title={"Dashboard-create product"}>
        <div className="container-fluid m-3 p-3">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu/>
                </div>

                <div className="col-md-9">
                    <h2>Create Product</h2>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default CreateProduct
