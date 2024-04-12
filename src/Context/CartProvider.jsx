import React, { createContext, useContext, useState , useEffect  } from 'react';
import { useAuth } from './AuthProvider';
import axios from 'axios';

const cartContext = createContext()

const CartProvider = ({children}) => {

    const [cart,setCart] = useState([])
    const [auth,setAuth] = useAuth() 


    return (
        <cartContext.Provider value={[cart,setCart]}>
            {children}
        </cartContext.Provider>
        
    );
};

const useCart = () => useContext(cartContext)



export  {useCart ,CartProvider}