import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout.js'
import axios from 'axios'
import { baseUrl } from '../Layout/BaseUrl.js'
import { useParams } from 'react-router-dom'

const DetailedProduct = () => {
    const params = useParams()
    const [detailed,setDetailed] = useState({});

    const detaledProduct = async()=>{
        try {
            const { data } = await axios.get(`${baseUrl}/api/v1/product/single-product/${params.slug}`);
            if(data?.success){
                setDetailed(data?.product)
            }
            console.log({detailed})
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(params?.slug) detaledProduct()
    },[params?.slug])
    return (
        <Layout>
          <div className="row container align-items-start">
          <div className="col-md-6">
                <img 
                    src={`${baseUrl}/api/v1/product/get-photo/${detailed._id}`} 
                    className="card-img-top" 
                    alt={detailed.name} 
                    style={{ width: '400px', height:'400px' }} // Use inline styles in JSX
                />
            </div>

            <div className="col-md-6">
            <h2 className="card-title text-center mb-4">Product Details</h2>
                <h5 className="card-text"><strong>Name:</strong> {detailed?.name}</h5>
                <h5 className="card-text"><strong>Description:</strong> {detailed?.description}</h5>
                <h5 className="card-text"><strong>Price:</strong> ${detailed?.price}</h5>
                <h5 className="card-text"><strong>Category:</strong> {detailed?.category?.name}</h5>
                <button className='btn btn-primary ms-1'>Add to Cart</button> 
            </div>
          </div>
          <div className="row">Similar product</div>
        </Layout>
    )
}

export default DetailedProduct

