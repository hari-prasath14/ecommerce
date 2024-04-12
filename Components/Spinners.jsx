import React, { useEffect, useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

const Spinners = ({path = "/login"}) => {
    const  [count,setCount]= useState(3)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(()=>{
        const interval = setInterval(()=>{

            setCount((count)=> --count)

        },1000)

        count===0 &&  navigate(`${path}`,{
            state:location.pathname,
        })
            return () =>clearInterval(interval)
        
        },[count,navigate,location,path])
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <h1 className='Text-center'>Redirecting you to login page in {count} seconds</h1>


            <div className="spinner-border" role="status">
                
                <span className="visually-hidden">Loading...</span>
                <div>


                </div>

            </div>
        </div>




    );
};

export default Spinners;