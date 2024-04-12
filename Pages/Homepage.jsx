import React, { useEffect, useState } from 'react';
import Layout from '../Components/Layout/Layout';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Checkbox, Radio } from 'antd'
import { Prices } from '../Components/Prices';
import toast from 'react-hot-toast';
import { useCart } from '../src/Context/CartProvider';
import { useAuth } from '../src/Context/AuthProvider';

const Homepage = () => {

    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [checked, setChecked] = useState([])
    const [radio, setRadio] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const [cart, setCart] = useCart()

    const [auth, setAuth] = useAuth()

    const navigate = useNavigate()

    const getTotal = async () => {
        try {
            const { data } = await axios.get('https://ecommercebackend-ztyj.onrender.com/api/product/product-count')
            setTotal(data?.total)
        }
        catch (error) {
            console.log(error);
        }
    }





    useEffect(() => {
        getTotal()
        getAllCategory()
    }, [])


    const getAllProducts = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`https://ecommercebackend-ztyj.onrender.com/api/product/product-list/${page}`)
            setLoading(false)
            setProducts(data.products)


        }
        catch (error) {
            setLoading(false)

            console.log(error);
        }


    }

    useEffect(() => {
        if (page === 1) return

        loadMore()

    }, [page])

    // load more

    const loadMore = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`https://ecommercebackend-ztyj.onrender.com/api/product/product-list/${page}`)
            setLoading(false)
            setProducts([...products,...data.products])


        }
        catch (error) {
            setLoading(false)

            console.log(error);
        }


    }


    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('https://ecommercebackend-ztyj.onrender.com/api/category/get-category')
            if (data?.success) {
                setCategories(data?.allCategory)
            }
        }
        catch (error) {
            toast.error("Something went wrong")
        }

    }

    // Get filtered product

    const getFilteredProduct = async () => {
        try {
            const { data } = await axios.post("https://ecommercebackend-ztyj.onrender.com/api/product/product-filter", { checked, radio })
            setProducts(data?.filteredProduct)

        }

        catch (error) {

        }
    }

    const handleCheckbox = (value, id) => {
        let all = [...checked]

        if (value) {
            all.push(id)
        }
        else {
            all = all.filter((c) => c !== id)
        }
        setChecked(all)

    }

    const handleRadio = (value) => {
        setRadio(value)
    }





    useEffect(() => {
        if (!checked.length && !radio.length) getAllProducts()

    }, [checked.length, radio.length])

    useEffect(() => {

        if (checked.length || radio.length) getFilteredProduct()
    }, [checked, radio])


    return (
        <Layout>
           
            <div className="row mt-3 " style={{ backgroundColor: 'white' }}>
                <div className="col-md-2" style={{ alignItems: 'flex-start', marginLeft:'20px'}}>
                    <h4 className='text-center'>Filter by category</h4>
                    <div className="d-flex flex-column">
                        {categories?.map((c) => (
                            <Checkbox key={c._id} onChange={(e) => handleCheckbox(e.target.checked, c._id)}>
                                {c.name}
                            </Checkbox>
                        ))}
                    </div>
                    
                    <h4 className='text-center mt-4'>Filter by category</h4>
                    <div className="d-flex flex-column">

                        <Radio.Group onChange={(e) => handleRadio(e.target.value)}>
                            {Prices?.map((p) => (
                                <div key={p._id}>
                                    <Radio value={p.array}>{p.name}</Radio>
                                </div>
                            ))}
                        </Radio.Group>


                    </div>
                    <div>
                        <button className="btn btn-primary btn-sm ms-2 mt-3 button" style={{ fontSize: '12px', backgroundColor: '#05386B' }} onClick={() => { window.location.reload() }}>Reset Filters</button>

                    </div>

                </div>
                <div className="col-md-9">
                    <div className='d-flex flex-wrap' style={{ justifyContent: 'space-evenly' }}>
                        {products?.map((p) => (
                            <div className="card m-3 h-90 " style={{ width: '12rem' }}>
                                <Link to={`/productDetail/${p.slug}`} style={{textDecoration :'none'}}>
                                <div className="card-inner">
                                    <img src={`http://localhost:4000/api/product/product-image/${p._id}`}
                                        className="card-img "
                                        alt={p.name}
                                        height={'200px'} width={'200px'} />
                                </div>
                                <div className="card-body" style={{color: 'black'}} >
                                    <p className="card-text" style={{ fontSize: '15px',fontWeight: 'bold' }}>{p.brand}</p>
                                    <p className="card-title" style={{ fontSize: '12px',fontWeight: 'bold' }}>{p.name}</p>
                                    <p className="card-text" style={{ fontSize: '15px',fontWeight: 'bold' }}>Rs. {p.price}</p>

                                </div>
                                </Link>                                                                     
                            </div>
                            






                        ))}
                    </div>

                    <div className='m-2 p-3'>
                        {products && products.length < total && (
                            <button className='btn btn-warning'
                                onClick={(e) => {
                                    e.preventDefault()
                                    setPage(page + 1)
                                }}
                            >
                                {loading ? 'Loading...' : 'Load more'}
                            </button>
                        )}
                    </div>

                </div>

            </div >

        </Layout >
    );
};

export default Homepage;