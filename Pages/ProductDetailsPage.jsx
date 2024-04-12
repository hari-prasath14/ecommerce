import React, { useEffect, useState } from 'react';
import Layout from '../Components/Layout/Layout';
import {useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../src/Context/CartProvider';
import toast from 'react-hot-toast';
import { useAuth } from '../src/Context/AuthProvider';
import backendUrl from '../src/config';

const ProductDetailsPage = () => {

    const navigate =useNavigate()

    const params = useParams()
    const[product,setProduct] = useState([])
    const [relatedProducts,setRelatedProducts] = useState([])
    const[cart,setCart]= useCart()
    const[cartAddButton,setCartAddButton] = useState(true)
    const [auth,setAuth] = useAuth()



    const GettingCartId = async () =>{
        try{
            
            const config = {
                headers: {
                    Authorization: auth.token
                }
            };

            const res = await axios.get(`${backendUrl}/api/user/get-cart`,config)
                       
            const cartArray = res.data.cartArray;
        
            setCart(cartArray);
            


        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
       
        if(auth) GettingCartId()
    },[auth])



    const InsertingCartItems = async (product_id) =>{

        if(!auth.token){
            navigate('/login')
        }

        else{

       
           // Update cart state with the new product_id
    setCart(prevCart => [...prevCart, product_id]);

    // Send the updated cart to the backend
    try {

        const updatedCart = [...cart, product_id];

        const res = await axios.put(`${backendUrl}/api/user/insert-cart`,{
            cart:updatedCart
        })
        console.log(res);
        GettingCartId()

    
    }
    catch(error){
        console.log(error);
    }
}
    }

    


    useEffect(() => {

        if(params?.slug) getProduct()

    },[params?.slug])


      

    const getProduct = async() =>
    {
        try {
            const {data} = await axios.get(`${backendUrl}/api/product/get-product/${params.slug}`)
            setProduct(data?.oneProduct)  
            getSimilarProduct(data?.oneProduct?._id,data?.oneProduct?.category?._id)
            
        } 
        
        catch (error) 
        {
            console.log(error);
        }      

    }



    // Getting similar products

    const getSimilarProduct = async(pid,cid) =>
    {
        try 
        {
            const {data} =await axios.get(`${backendUrl}/api/product/similar-product/${pid}/${cid}`)
            setRelatedProducts(data.similarProducts)

        } 
        catch (error) 
        {
            console.log(error);
        }
    }


    return (
        <Layout>
            
            <div className="row mt-4  product-detail-container" style={{justifyContent: 'space-around'}} >
                <div className="col-sm-4" >
                <img src={`${backendUrl}/api/product/product-image/${product._id}`} 
                                    className="card-img-top product-image" 
                                    alt={product.name}
                                    height ={'300px'} width={'100px'} />
                </div>
                <div className="col-sm-6 ">
                    <h1>{product.brand}</h1>
                    <h6>Name: {product.name}</h6>
                    <h6 className='product-description'>Description: {product.description}</h6>
                    <h6 className='product-price'>Price: Rs.{product.price}</h6>
                    <div className="col-sm-6 mt-3">
                        <button className="btn btn-secondary btn-sm"
                        id='addcart'
                        style={{ fontSize: '12px' }}
                        onClick={()=> { 

                            InsertingCartItems(product?._id)
                            
                            const but = document.getElementById("addcart")
                            but.innerHTML = "ADDED"
                            but.disabled=true

                           
                            
                            toast.success("Item added to cart")
                            
                        }}
                        >
                        ADD TO CART 
                        </button>
                    </div>                        
                    
                </div>
                </div>
            <hr/>
            <div className="row mt-3">
                  
                {relatedProducts.length < 1 ? <h3 className='text-center'>No similar products Found </h3> :  <h3> similar products </h3>}
                  <div className='d-flex flex-wrap' >
                        {relatedProducts?.map((p) => (
                            <div className="card m-3 h-90 " style={{ width: '12rem' }}>
                                <div className="card-inner">
                                <img src={`${backendUrl}/api/product/product-image/${p._id}`}
                                    className="card-img-top "
                                    alt={p.name}
                                    height={'200px'} width={'200px'} />
                                </div>    
                                <div className="card-body">
                                    <p className="card-title" style={{ fontSize: '12px',fontWeight: 'bold' }}>{p.name}</p>
                                    <p className="card-text" style={{ fontSize: '15px',fontWeight: 'bold' }}>$ {p.price}</p>

                                    <div className="row mt-3 ">
                                    <div style={{display:'flex',justifyContent:'center',flexWrap:'wrap'}}>
                                        <button className="btn btn-primary btn-sm button"
                                                onClick={() =>{ navigate(`/productDetail/${p.slug}`)
                                                const but = document.getElementById("addcart")
                                                but.innerHTML = "ADD TO CART"
                                                but.disabled=false
                                                }
                                            }
                                                style={{padding:'5px  40px', fontSize: '12px', backgroundColor: '#05386B'}}>
                                                More details 
                                            </button>

                                        </div>



                                    </div>


                                </div>
                            </div>






                        ))}
                    </div>
            </div>
        </Layout>        
    
    );
};

export default ProductDetailsPage;