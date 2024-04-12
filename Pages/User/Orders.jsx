import React, { useEffect, useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import UserMenu from '../../Components/Layout/UserMenu';
import axios from 'axios';
import moment from 'moment'
import { useAuth } from '../../src/Context/AuthProvider';
import backendUrl from '../../src/config';


const Orders = () => {

    const [order ,setOrder] =useState([])

    const [auth ,setAuth] = useAuth()


const getOrders = async() =>{
    const res = await axios.get(`${backendUrl}/api/user/get-orders`)
    setOrder(res.data.userOrder)
}

const getPaymentStatus = async() =>{

    try{
        const res = await axios.get(`${backendUrl}/api/order/payment-status`)
        let payment_status =res.data.payment_status
        let paymentId = res.data.paymentId


        if(payment_status === "paid")
        {

            const result = await axios.put(`${backendUrl}/api/order/update-payment-status`,{
            payment_status,
            paymentId

        })

        }
        getOrders()
    }
    catch(error){
        console.log(error);
    }
}

useEffect(() => {
    if(auth) getPaymentStatus()
    

},[auth])
    
    return (
        <Layout title={'Dashboard - Orders'}>
            <div className="container-fluid p-3 m-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className='text-center'>All Orders</h1>
                        {
                            order.map((o,i)=>{
                                return(
                                    <div className='border shadow'>
                                        <table className='table'>
                                            <thead>
                                                <tr>
                                                    <td scope='col'>#</td>
                                                    <td scope='col'>Status</td>
                                                    <td scope='col'>date</td>
                                                    <td scope='col'>Payment</td>
                                                    <td scope='col'>Quantity</td>
                                                    
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{i+1}</td>
                                                    <td>{o?.status}</td>
                                                    <td>{moment(o?.createdAt).fromNow()}</td>
                                                    <td>{o?.paymentStatus}</td>

                                                    <td>{o?.products.length}</td>

                                                </tr>
                                            </tbody>

                                        </table>
                                        <div className="container">
                                        {o?.products?.map((p)=> (
                                            <div className='row mb-2 p-3 card flex-row' key={p._id}>
                                                <div className='col md-4'>
                                                <img src={`${backendUrl}/api/product/product-image/${p._id}`}
                                            className="card-img-top "
                                            alt={p.name}
                                            height={'200px'} widtd='200px' />
                                    </div>
                                    <div className="col-md-8 mt-3">
                                                <>
                                                <p>{p.name}</p>
                                            <p>{p.description.substring(0,30)}</p>
                                            <p>price : {p.price}</p>
                                                </>

                                                </div>

                                            </div>
                                            
                                               
                                            ))}
                                        </div>

                                    </div>
                                )
                            })
                        }       
                    </div>

                </div>
            </div>
            
        </Layout>
    );
};

export default Orders;