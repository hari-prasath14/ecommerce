import React, { useEffect, useState } from 'react';
import { useAuth } from '../../src/Context/AuthProvider';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Spinners from '../Spinners';
import backendUrl from '../../src/config';

const AdminRoute = () => {
    const [verified,setVerified] = useState(false)
    const[auth,setAuth]= useAuth()


    //checking token
    
    const authCheck= async()=>{

        const res = await axios.get(`${backendUrl}/api/user/admin-auth`)
        if(res.data.verified)
        {
            setVerified(true)
        }
        else{
            setVerified(false)
        }

    }



    useEffect(()=>{
        
        authCheck()

    },[auth.token])

    return verified ? <Outlet/> : <Spinners path="/"/>
};

export default AdminRoute;