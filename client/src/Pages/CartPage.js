import React, { useEffect } from 'react'
import Layout from '../Layout/Layout'
import { useAuth } from '../Context/auth'
import { useCart } from '../Context/cart';
import { baseUrl } from '../Layout/BaseUrl';
import toast from 'react-hot-toast';

const CartPage = () => {
    const [auth,setAuth] = useAuth();
    const [cart,setCart] = useCart();

    const totalAmount = ()=>{
    try {
        let total = 0;
        cart?.map((item)=>{
            total = total + item?.price
        })
        return total.toLocaleString("en-US",{
            style:"currency",
            currency:"USD"
        })
    } catch (error) {
        console.log(error)
    }
    }

    const removeCartItem =(pid)=>{
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item)=>item._id === pid)
            myCart.splice(index,1)
            setCart(myCart)
            localStorage.setItem('cart', JSON.stringify(myCart)); // Save the updated cart to localStorage
            toast.success('Product removed')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        let existingCartItems = localStorage.getItem('cart')
        if(existingCartItems) setCart(JSON.parse(existingCartItems))
    },[])

  return (
    <Layout>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12 mt-3">
                    <h1 className='text-center'>{`Hello ${auth?.token && auth?.user?.name}`}</h1>
                    <h4 className='text-center'>
                        {cart.length>1
                         ? `You have ${cart.length} product in your cart 
                         ${auth.token ? "" : "Please login to checkout"}`
                         :"Your cart is empty"}
                    </h4>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col-md-7">
                {cart?.map((product) => (
                <div key={product._id} className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4 d-flex align-items-center justify-content-center">
                        <img 
                            src={`${baseUrl}/api/v1/product/get-photo/${product._id}`}
                            className="img-fluid rounded-start"
                            alt={product.name} 
                            style={{ width: '300px', height:'200px' }} 
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body ms-3 d-flex flex-column justify-content-center">
                            <h5 className="card-title mb-2">{product.name}</h5>
                            <p className="card-text mb-2">{product.description.substring(0, 30)}...</p>
                            <p className="card-text">
                                <strong>$ {product.price}</strong>
                            </p>
                        </div>
                        <button onClick={()=>removeCartItem(product._id)} className='btn btn-danger ms-4'>Remove</button>

                    </div>
                </div>
            </div>
            
                ))}
                </div>
                <div className="col-md-5 text-center ">
                    <h2>Cart Summary</h2>
                    <p>Total | Checkout | Payment</p>
                    <hr />
                    <h4>Total : {totalAmount()}</h4>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default CartPage
