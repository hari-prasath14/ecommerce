import React from 'react';
import { useSearch } from '../src/Context/SearchProvider';
import Layout from '../Components/Layout/Layout';
import { Link } from 'react-router-dom';

const SearchPage = () => {
    const [values, setValues] = useSearch()
    return (
        <Layout>

            <div className='Container'>
                <div className='text-center'>
                    <h1>Search Results</h1>
                    <h6>{values?.result.length < 1 ? 'No Products Found' : `found ${values?.result.length}`}</h6>
                </div>

                <div className='d-flex flex-wrap mt-4' style={{ justifyContent: 'space-around' }}>
                    {values?.result.map((p) => (
                        <div className="card m-2 h-90 " style={{ width: '15rem', }}>
                            <Link to={`/productDetail/${p.slug}`} style={{ textDecoration: 'none' }}>

                                <div className="card-inner">
                                    <img src={`http://localhost:4000/api/product/product-image/${p._id}`}
                                        className="card-img-top "
                                        alt={p.name}
                                        height={'200px'} width={'200px'} />
                                </div>
                                <div className="card-body" style={{color: 'black'}}>
                                    <p className="card-text" style={{ fontSize: '15px',fontWeight: 'bold' }}>{p.brand}</p>
                                    <p className="card-title" style={{ fontSize: '12px',fontWeight: 'bold' }}>{p.name}</p>
                                    <p className="card-text" style={{ fontSize: '15px',fontWeight: 'bold' }}>Rs. {p.price}</p>

                                    <div className="row mt-3 ">
                                        



                                    </div>


                                </div>
                                </Link>

                        </div>






                    ))}

                </div>



            </div>

        </Layout>
    );
};

export default SearchPage;