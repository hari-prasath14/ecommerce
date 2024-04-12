import React, { useEffect, useState } from 'react';
import AdminMenu from '../../Components/Layout/AdminMenu';
import Layout from '../../Components/Layout/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import backendUrl from '../../src/config';

const Products = () => {
    const [products, setProducts] = useState([])

    const getAllProducts = async () => {

        try {
            const { data } = await axios.get(`${backendUrl}/api/product/get-product`)
            setProducts(data.allProducts)
        }
        catch (err) {
            toast.error(err)
        }
    }



    useEffect(() => {
        getAllProducts()
    }, [])
    return (
        <Layout >
            <div className="row mt-3">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1 className='text-center'>All Product List</h1>
                    <div className="d-flex flex-wrap mb-5">
                        {products?.map((p) => (
                            <Link style={{textDecoration : 'none'}} key={p._id} to ={`/dashboard/admin/products/${p.slug}`}>
                                <div className='product-link'></div>
                                <div className="card m-3 h-100 " style={{ width: '18rem' }}>

                                    <img src={`${backendUrl}/product/product-image/${p._id}`} 
                                    className="card-img-top " 
                                    alt={p.name}
                                    height ={'200px'} width={'200px'} />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description}</p>
                                        <p className="card-text">{p.quantity}</p>

                                    </div>
                                </div>

                            </Link>





                        ))}
                    </div>

                </div>

            </div>



        </Layout >

    );
};

export default Products;