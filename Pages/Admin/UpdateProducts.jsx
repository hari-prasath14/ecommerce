import React, { useState, useEffect } from 'react';
import Layout from '../../Components/Layout/Layout';
import AdminMenu from '../../Components/Layout/AdminMenu';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Select } from 'antd';
import { useNavigate,useParams } from 'react-router-dom';
const { Option } = Select
import backendUrl from '../../src/config';

const UpdateProduct= () => {

    const navigate = useNavigate()
    const params = useParams()

    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [quantity, setQuantity] = useState("")
    const [shipping, setShipping] = useState("")
    const [images, setImages] = useState("")
    const [brand, setBrand] = useState("")
    const [id,setId]=useState("")


    //get single product

    const getSingleProduct = async() =>{

        try {
            const {data} = await axios.get(`${backendUrl}/api/product/get-product/${params.slug}`)
            setId(data.oneProduct._id)
            setName(data.oneProduct.name)            
            setDescription(data.oneProduct.description)            
            setPrice(data.oneProduct.price)            
            setQuantity(data.oneProduct.quantity)            
            setShipping(data.oneProduct.shipping)      
            setBrand(data.oneProduct.brand)      
            setCategory(data.oneProduct.category._id)            
        } 
        catch (error) {
            console.log(error)
            
        }
        
    }



    
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/category/get-category`)
            if (data?.success) {
                setCategories(data?.allCategory)
            }
        }
        catch (error) {
            toast.error("Something went wrong")
        }

    }

    // Create Product Function

    const handleUpdate =async(e) =>{
        e.preventDefault()
        try {

            const productData = new FormData()
            productData.append('name', name)
            productData.append('description', description)
            productData.append('price', price)
            productData.append('category', category)
            productData.append('quantity', quantity)
            images && productData.append('images', images)
            productData.append('shipping', shipping)
            productData.append('brand', brand)

            const {data} = await axios.put(`${backendUrl}/api/product/update/${id}`,productData)

            console.log(data);

            if (data?.success) {
                toast.success("Product Updated Sucessfully")   
                navigate('/dashboard/admin/products')

            }
            else{

                toast.error("Error in Updating")
            }
            
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
            
        }


    }


    const handleDelete = async(e)=>{
        e.preventDefault()
        try {
            const answer = window.confirm("Are you sure you to delete the product")

            if(!answer) return
            
            const {data}=  await axios.delete(`${backendUrl}/api/product/delete/${id}`)
        if(data.success)
        {
            toast.success(data.message)
            navigate('/dashboard/admin/products')

        }
        else
        {
            toast.error("Error in deleting product")
        }
        } 
        catch (error) 
        {
            console.log(error);
        }

    }


    useEffect(() => {
        getSingleProduct()
        getAllCategory()
    }, [])





    return (
        <Layout title={'Dashboard - Create Product'}>
            <div className="container-fluid m-3 p-3">

                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>Upload Product</h1>
                        <div className="m-1">

                            <Select bordered={false}
                                placeholder="Select category"
                                size="large"
                                showSearch
                                className='form-select mb-3'
                                onChange={(value) => { setCategory(value) }}
                                value={category}
                            >
                                {categories?.map((c) => (

                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>

                                ))}
                            </Select>

                            {/* Image */}

                            <div className="mb-3">
                                <label className='btn btn-outline-secondary col-md-12'>
                                    {images ? images.name : "Upload photo"}
                                    <input type="file"
                                        name="images" accept='image/*'
                                        onChange={(e) => { setImages(e.target.files[0]) }} hidden></input>
                                </label>
                            </div>

                            {/* Image Preview */}

                            <div className="mb-3">
                                {images ? (
                                    <div className="text-center">
                                    <img src= {URL.createObjectURL(images)} 
                                    alt ="product_photo" height ={'200px'} 
                                    className='img img-response'></img>
                                </div>                                
                                   
                                ):
                                (

                                    <div className="text-center">
                                    <img src={`${backendUrl}/api/product/product-image/${id}`}
                                    alt ="product_photo" height ={'200px'} 
                                    className='img img-response'></img>
                                </div>
                                    
                                )
                                
                                }
                            </div>
                            
                            {/* Product name */}

                            <div className="mb-3">
                                <input type="text" 
                                value= {name} placeholder="Product name" 
                                className='form-control'
                                onChange={(e) =>{setName(e.target.value)}}></input>
                            </div>
                           
                           
                            {/* Product brand */}

                            <div className="mb-3">
                                <input type="text" 
                                value= {brand} placeholder="Product brand" 
                                className='form-control'
                                onChange={(e) =>{setBrand(e.target.value)}}></input>
                            </div>

                            {/* Description */}

                            <div className="mb-3">
                                <textarea
                                value= {description} placeholder="Description of the product" 
                                className='form-control'
                                onChange={(e) =>{setDescription(e.target.value)}}/>
                            </div>

                            {/* Price */}

                            <div className="mb-3">
                                <input type="number" 
                                value= {price} placeholder="Price of the product" 
                                className='form-control'
                                onChange={(e) =>{setPrice(e.target.value)}}></input>
                            </div>

                            {/* Quantity */}

                            <div className="mb-3">
                                <input type="text" 
                                value= {quantity} placeholder="write a quantity" 
                                className='form-control'
                                onChange={(e) =>{setQuantity(e.target.value)}}></input>
                            </div>

                            {/* Shipping */}

                            <Select 
                                bordered={false}
                                placeholder="Select Shipping"
                                size="large"
                                showSearch
                                className='form-select mb-3'
                                onChange={(value) => {
                                     setShipping(value) }}
                                value = {shipping ?'Yes': 'No'}                                   

                            >
                                
                                <Option value ="1">YES</Option>
                                <Option value ="0">NO</Option>
                            
                            </Select>
                            <div className='mb-3'>
                            <button className='btn btn-primary' onClick={handleUpdate}>UPDATE PRODUCT</button>
                            </div>

                            <div className='mb-3'>
                            <button className='btn btn-danger' onClick={handleDelete}>DELETE PRODUCT
                            
                            
                            </button>

                        
                            
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </Layout>

    );
};

export default UpdateProduct;



