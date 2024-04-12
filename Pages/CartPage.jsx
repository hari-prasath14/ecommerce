import React, { useEffect, useState } from 'react';
import Layout from '../Components/Layout/Layout';
import { useCart } from '../src/Context/CartProvider';
import { useAuth } from '../src/Context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const CartPage = () => {

    const [auth, setAuth] = useAuth()
    const [cart, setCart] = useCart()
    const [cartItems, setCartItems] = useState([])
    const [customerId, setCustomerId] = useState()
    const [productId, setProductId] = useState([])
    const [amount, setAmount] = useState()

    const navigate = useNavigate()

    const totalPrice = () => {

        let total = 0
        try {
            cartItems.map((item) => {
                total = total + item.price

            })

            return total.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR"
            })
        }
        catch (error) {
            console.log(error);
        }
    }

    const removeCartItem = async (pid) => {
        try {
            console.log("remove", pid);
            let myCart = [...cart]
            let index = myCart.findIndex(item => item === pid)


            if (index !== -1) {
                // Remove the item from the copied array
                myCart.splice(index, 1);
            }

            console.log(index);

            setCart(cart => myCart)
            const res = await axios.put('http://localhost:4000/api/user/insert-cart', {
                cart: myCart
            })
            console.log(res);
            GettingCartId()

        }
        catch (error) {
            console.log(error);
        }

    }

    const makePayment = async () => {

        try {


            const res = await axios.post('http://localhost:4000/api/order/make-payment', {
                auth,
                cartItems,
                // amount
            })
            window.location = res.data.url
        }
        catch (error) {
            console.log(error);
        }
    }




    const GettingCartId = async () => {
        try {

            const config = {
                headers: {
                    Authorization: auth.token
                }
            };

            const res = await axios.get('http://localhost:4000/api/user/get-cart')
            const cart = res.data.cartArray

            setCart(cart)

            const productPromises = cart.map(async (item) => {
                const productRes = await axios.get(`http://localhost:4000/api/product/get-productbyid/${item}`, config);
                return productRes.data.oneProduct;
            });

            // Wait for all product details to be fetched
            const products = await Promise.all(productPromises);

            // Update cartItems state with all fetched product details
            setCartItems(products);


        } catch (error) {
            console.log(error);
        }

    }





    useEffect(() => {

        if (auth) GettingCartId()
    }, [auth])

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center bg-light p-2">

                            {auth.token ? `Hello ${auth?.user?.firstName}` : navigate('/login')}

                        </h1>
                        <h4 className='text-center'>

                            {cartItems?.length >= 1 ? `You have ${cart.length} items in cart ${auth?.token ? "" : "Please login to checkout"
                                } ` : "Your cart is empty"}


                        </h4>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <div className="cart-container">
  
                            <div className="cart-items" style={{marginLeft: '25px'}}>
                                {
                                    cartItems?.map((p) => (
                                        <div className="row mb-2 card flex-row">
                                            <div className="cart-item-image">
                                                <img src={`http://localhost:4000/api/product/product-image/${p._id}`}
                                                    className="card-img-top "
                                                    alt={p.name}
                                                    height={'200px'} width='200px' />
                                            </div>
                                            <div className="col-md-8 mt-3">
                                            <div className="cart-item-details">
                                                    <h6>{p.name}</h6>
                                                    <p>Price: Rs. {p.price}</p>

                                            </div>

                                                <button className=' btn btn-danger' style={{ marginBottom: '10px' }} onClick={() => removeCartItem(p._id)}>Remove</button>
                                            </div>
                                        </div>

                                    ))
                                }

                            </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <h4>Cart Summary</h4>
                            <p> Total | Checkout | Payment</p>
                            <hr />
                            <h4>Total : {totalPrice()}</h4>
                            {auth?.user?.address ? (
                                <>
                                    <div className="mb-3">
                                        <h4>Current Address</h4>
                                        <h5>{auth?.user?.address}</h5>
                                        <button className='btn btn-outline-warning'
                                            onClick={() => { navigate('/dashboard/user/profile') }}
                                        >Update Address</button>
                                    </div>
                                </>)
                                : (
                                    <div className="mb-3">
                                        {
                                            auth?.token ? (
                                                <button className='btn btn-outline-warning' onClick={() => { navigate('/dashboard/user/profile') }}>
                                                    Add Address</button>
                                            ) : (
                                                <button className='btn btn-outline-warning'
                                                    onClick={() => {
                                                        navigate('/login',
                                                            { state: '/cart' })
                                                    }}>
                                                    Login</button>
                                            )}

                                    </div>
                                )}
                            <div className="mt-2">

                                <button className='btn btn-primary' onClick={makePayment}>Make Payment</button>

                            </div>
                        </div>

                    </div>
                </div>
        </Layout>
    );
};

export default CartPage;



