import React, { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { baseUrl } from  '.././Layout/BaseUrl'
import {Checkbox , Radio, Select} from 'antd'
import { price } from '../components/Price';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../Context/cart';
import SearchInput from '../components/Form/SearchInput';
import AutoImageSlider from './Slider/Slider';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategories] = useState([]);
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(1) //Initially false 
  const [cart,setCart] = useCart();
  const navigate = useNavigate()
  const [showFilters, setShowFilters] = useState(false);
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  


  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error fetching categories");
    }
  };
  
  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${baseUrl}/api/v1/product/product-list/${page}`);
      setLoading(false)
      setProducts(data?.product)
      if (data?.success) {
        setProducts(data.product);
      } else {
        toast.error('Failed to fetch products');
      }
    } catch (error) {
      console.log('Error fetching products:', error);
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  useEffect(() => {
    if(!checked.length || !radio.length) getAllProducts();
  }, [checked.length,radio.length]);

  // Get total count 
  const getTotalCount = async ()=> {
    try {
      const {data} = await axios.get(`${baseUrl}/api/v1/product/product-count`);
      if(data?.success){
        setTotal(data?.total);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching total count product");
    }
  }

  useEffect(()=>{
    getAllCategory();
    getTotalCount()
  },[])

  // Load More products
  const loadMore = async()=> {
    try {
      setLoading(true)
      const {data} = await axios.get(`${baseUrl}/api/v1/product/product-list/${page}`);
      setLoading(false)
      setProducts([...products, ...data?.product])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    if(page === 1) return
    loadMore()
  },[page])
  
  const handleFilter = async (value,id) => {
    let all = [...checked];
    if(value)(
      all.push(id)
    )
    else{
      all = all.filter(c => c !== id)
    }
    setChecked(all)
  }
  
  useEffect(()=>{
    if(checked.length || radio.length) filterProduct();
  },[checked,radio])

  const filterProduct = async ()=>{
    try {
      const {data} = await axios.post(`${baseUrl}/api/v1/product/product-filter`,{radio,checked})
      if(data.success){
        setProducts(data?.products)
        toast.success(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout title={'Best offers'}>

      {/* Filters for mobile */}
      <div className='m-3 d-flex d-md-none'>
        <SearchInput />
        <button className='p-1 ms-2 btn btn-primary p-2' onClick={toggleFilters}>
          {showFilters ? 'Filters' : 'Filters'}
        </button>
      </div>

      {showFilters && (
        <div className="row m-3 d-flex justify-content-end ms-2 ">
          <div className="col-md-2 d-flex d-md-block">
            <div className="d-flex flex-column">
            <h4>Category</h4>
              {category?.map((c)=>(
                <Checkbox key={c._id} onChange={(e)=>handleFilter(e.target.checked,c._id)}>
                  {c.name}
                </Checkbox>
              ))} 
            </div>

            
            <div className="d-flex flex-column ms-5 ms-md-0 ms-justify-content-end">
            <h4>Price</h4>
              <Radio.Group onChange={(e)=> setRadio(e.target.value)}>
                {
                  price?.map((p)=>(
                    <div key={p.name} className="div">
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))
                }
              </Radio.Group>
            </div>
            {/* Button for desktop */}
            <div className="d-none d-md-flex">
                <button className='btn btn-danger mt-2' onClick={() => window.location.reload()} style={{ width: 'auto' }}>
                    Reset Filters
                </button>
            </div>

          </div>
        </div>
      )}

      {/* Filters for desktop */}
      <div className="row m-3 d-flex justify-content-end  ms-2">
        <div className="col-md-2 d-none d-flex d-md-block">
          <div className="d-flex flex-column">
          <h4>Category</h4>
            {category?.map((c)=>(
              <Checkbox key={c._id} onChange={(e)=>handleFilter(e.target.checked,c._id)}>
                {c.name}
              </Checkbox>
            ))} 
          </div>

          <div className="d-flex flex-column ms-5 ms-md-0 ms-justify-content-end">
          <h4>Price</h4>
            <Radio.Group onChange={(e)=> setRadio(e.target.value)}>
              {
                price?.map((p)=>(
                  <div key={p.name} className="div">
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))
              }
            </Radio.Group>
          </div>
          {/* Button for desktop */}
          <div className="d-none d-md-flex">
              <button className='btn btn-danger mt-2' onClick={() => window.location.reload()} style={{ width: 'auto' }}>
                  Reset Filters
              </button>
          </div>

        </div>  
         
        <div className="col-12 col-md-9 mx-auto">
        <AutoImageSlider/>
            <h1 className="text-center mt-3 mb-4">All Products</h1>
            <div className="row row-cols-2 row-cols-sm-2 row-cols-md-3 g-2 justify-content-center">
              {products?.map((product) => (
                <div key={product._id} className="col d-flex justify-content-center">
                  {/* Small Card for Mobile */}
                  <div className="card d-md-none shadow-sm" style={{ width: '10rem', borderRadius: '8px', overflow: 'hidden' }}>
                  <Link to={`/detailed-product/${product.slug}`}>
                    <img
                      src={`${baseUrl}/api/v1/product/get-photo/${product._id}`}
                      className="card-img-top"
                      alt={product.name}
                      style={{ width: '100%', height: '120px', objectFit: 'cover', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
                    />
                  </Link>
                    <div className="card-body d-flex flex-column justify-content-between p-2" style={{ minHeight: '90px' }}>
                      <div className="product-info  mb-2">
                        <Link to={`/detailed-product/${product.slug}`} className="text-decoration-none d-flex justify-content-between">
                          <h6 className="card-title text-truncate" style={{ fontSize: '0.9rem', marginBottom: '4px' }}>{product.name}</h6>
                          <p className="card-text fw-bold mb-2" style={{ fontSize: '0.85rem', color: '#333' }}>${product.price}</p>
                        </Link>
                        {/* <p>{product.description}</p> */}
                      </div>
                      <button className="btn btn-success btn-sm w-100 mt-auto "
                        onClick={() => {
                          setCart([...cart, product]);
                          localStorage.setItem('cart', JSON.stringify([...cart, product]));
                          toast.success("Item added to cart");
                        }}
                        style={{ fontSize: '0.8rem', padding: '6px 0' }}
                      >
                        Add to Cart
                      </button>
                    </div>
                
                  </div>


                  {/* Large Card for Desktop */}
                  <div className="card h-100 d-none d-md-block" style={{ width: '18rem' }}> {/* Show on medium and above */}
                    <img
                      src={`${baseUrl}/api/v1/product/get-photo/${product._id}`}
                      className="card-img-top"
                      alt={product.name}
                      style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                    />
                    <hr />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">{product.description.substring(0, 30)}</p>
                      <p className="card-text">$ {product.price}</p>
                      
                      <div className="mt-auto d-flex justify-content-between">
                        <button className="btn btn-primary" onClick={() => navigate(`/detailed-product/${product.slug}`)}>
                          More details
                        </button>
                        <button className="btn btn-success" 
                          onClick={() => {
                            setCart([...cart, product]);
                            localStorage.setItem('cart', JSON.stringify([...cart, product]));
                            toast.success("Item added to cart");
                          }}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="col-12 text-center mt-3">
                {products && products.length < total && (
                  <button 
                    className="btn btn-warning" 
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1);
                    }}
                  >
                    {loading ? "Loading..." : "Load More"}
                  </button>
                )}
              </div>
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
