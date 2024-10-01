import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout.js'
import axios from 'axios'
import { baseUrl } from '../Layout/BaseUrl.js'
import {Link, useNavigate, useParams } from 'react-router-dom'
import { useCart } from '../Context/cart.js'
import toast from 'react-hot-toast'

const DetailedProduct = () => {
    const params = useParams()
    const [detailed,setDetailed] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([])
    const [cart,setCart] = useCart();
    const navigate = useNavigate();


    const detaledProduct = async()=>{
        try {
            const { data } = await axios.get(`${baseUrl}/api/v1/product/single-product/${params.slug}`);
            if(data?.success){
                setDetailed(data?.product)
                similarProduct(data?.product?._id,data?.product?.category?._id)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const similarProduct = async(pid,cid)=>{
        try {
            const {data} = await axios.get(`${baseUrl}/api/v1/product/related-product/${pid}/${cid}`)
            if(data?.success){
                setRelatedProduct(data?.product)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSimilarProductClick = (slug)=>{
        navigate(`/detailed-product/${slug}`);
        window.location.reload(); // Refresh the page
    }

    useEffect(()=>{
        if(params?.slug) detaledProduct()
    },[params?.slug])
    return (
        <Layout>
        <div className="container align-items-start d-flex" >
            <div className="row d-flex d-flex-ms-3 flex-column flex-md-row ">
                <div className="col-md-6 mb-3 d-flex justify-content-center">
                    <img 
                        src={`${baseUrl}/api/v1/product/get-photo/${detailed._id}`} 
                        className="card-img-top img-fluid" 
                        alt={detailed.name} 
                        style={{ width: '100%', height: 'auto', maxWidth: '500px', }} // Keep max width for larger screens
                    />
                </div>

                <div className="col-md-6 d-flex flex-column align-items-start">
                <h2 className="card-title text-center fw-bold mb-4">Product Details</h2>
                <h5 className="card-text text-center"><strong>Name:</strong> {detailed?.name}</h5>
                <h5 className="card-text text-center"><strong>Description:</strong> {detailed?.description}</h5>
                <h5 className="card-text text-center"><strong>Price:</strong> ${detailed?.price}</h5>
                <h5 className="card-text text-center"><strong>Category:</strong> {detailed?.category?.name}</h5>
                <button 
                    className="btn btn-primary mt-3 w-100"
                    style={{ maxWidth: '300px' }}
                    onClick={() => {
                    setCart([...cart, detailed]);
                    localStorage.setItem('cart', JSON.stringify([...cart, detailed]));
                    toast.success("Item added to cart");
                    }}
                     >Add to Cart</button> 
                </div>
            </div>
        </div>

          <hr />
        <div className="row">
            <h2 className='text-center mt-3'>Similar product</h2>
            {relatedProduct?.length < 1 && <p className='text-center'>No Similar product found</p>}
            <div className="d-flex flex-wrap justify-content-center">
            {relatedProduct?.map((product) => (
                <div key={product._id} onClick={() => handleSimilarProductClick(product.slug)} className="card m-2 cursor-pointer" style={{width:'16rem',cursor:'pointer'}}>
                    <img 
                        src={`${baseUrl}/api/v1/product/get-photo/${product._id}`}
                        className="card-img-top small-card-img"
                        alt={product.name} 
                        style={{ width: '250px', height:'200px'}} 
                    />
                    <div className="card-body">
                        <div className='d-flex justify-content-between'>
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text fw-bold">$ {product.price}</p>
                    </div>
                    {/* <button 
                      className='btn btn-primary mt-2'
                      style={{width:"100%"}}
                      onClick={() => {
                        setCart([...cart, detailed]);
                        localStorage.setItem('cart', JSON.stringify([...cart, detailed]));
                        toast.success("Item added to cart");
                        }}
                    >Add to Cart</button> */}
                  </div>
                </div>
            ))}
            </div>
          </div>
        </Layout>
    )
}

export default DetailedProduct

