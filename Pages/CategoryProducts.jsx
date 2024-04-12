import React, { useEffect, useState } from 'react';
import Layout from '../Components/Layout/Layout';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import backendUrl from '../src/config';


const CategoryProducts = () => {
    const [products, setProducts] = useState([])
    const [Category, setCategory] = useState([])
    const params = useParams()
    const navigate = useNavigate()



    const getProductsByCategory = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/product/product-category/${params.slug}`)
            setProducts(data?.categoryProducts)
            setCategory(data?.category)
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (params?.slug) getProductsByCategory()

    }, [params?.slug])


    return (
        <Layout>

            <div className="container mt-4">
                <h3 className='text-center'>CATEGORY - {Category[0]?.name}</h3>
                <h5 className='text-center'>{products.length} results found</h5>
                <div className='d-flex flex-wrap' style={{ justifyContent: 'center' }}>    
                 {/* space-evenly */}
                        {products?.map((p) => (
                            <div className="card m-3 h-90 " style={{ width: '12rem' }}>
                                 <Link to={`/productDetail/${p.slug}`} style={{textDecoration :'none'}}>
                                <div className='card-inner'>
                                <img src={`${backendUrl}/api/product/product-image/${p._id}`}
                                    className="card-img-top "
                                    alt={p.name}
                                    height={'200px'} width={'200px'} />
                                </div>    
                                <div className="card-body" style={{color: 'black'}}>
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text" style={{ fontSize: '15px' }}>Rs. {p.price}</p>
                                    


                                </div>
                                </Link>

                            </div>

                        ))}
                    </div>
            </div>

        </Layout>

    );
};

export default CategoryProducts;