import React, { useEffect, useState } from 'react';
import AdminMenu from '../../Components/Layout/AdminMenu';
import Layout from '../../Components/Layout/Layout';
import { useAuth } from '../../src/Context/AuthProvider';
import axios from 'axios';
import moment from 'moment';
import { Select } from 'antd';
const {Option} = Select
import backendUrl from '../../src/config';


const AdminOrder = () => {

    const [status, setStatus] = useState(['Not Process', 'Processing', 'Shipped', 'Delivered', 'Cancel'])
    const [ChangeStatus, setChangeStatus] = useState('')


        const [order, setOrder] = useState([])

        const [auth, setAuth] = useAuth()


        const getOrders = async () => {
            try {
                const res = await axios.get(`${backendUrl}/api/user/get-allorders`)
                setOrder(res.data.allOrders)
                
            } 
            catch (error) 
            {
                
            }
        }

        

        useEffect(() => {
            if (auth) getOrders()

        }, [auth])

        const handleChange = async(orderId,value) =>{
            try{
                const {data} = await axios.put(`${backendUrl}/api/user/update-orderstatus/${orderId}`,
                {status:value}
                )
                getOrders()
            }    
            catch(error)
            {

            }
        }

        return (
            <Layout>
                <div>
                    <div className="row">
                        <div className="col-md-3">
                            <AdminMenu />
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
                                                    <td>
                                                        <Select bordered= {false} onChange={(value,orderId) => handleChange(o._id,value)  } defaultValue={o?.status}>
                                                            {
                                                                status.map((s,i)=>(
                                                                    <Option key = {i} value = {s} >{s}</Option>

                                                                ))
                                                            }
                                                        </Select>
                                                    </td>
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

    export default AdminOrder;