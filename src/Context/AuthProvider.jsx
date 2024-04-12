import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

const AuthProvider = ({children}) =>{

    const [auth , setAuth] = useState({ user : null ,token : ""})


    // Default axios
    axios.defaults.headers.common['Authorization']=auth.token

    


    useEffect(()=>{
        const data = localStorage.getItem('auth')
        if(data){
            const parseData = JSON.parse(data)
            
            setAuth({...auth,
            user:parseData.findUser,
            token:parseData.token,
            })
        }

        setTimeout(() => {
            localStorage.removeItem('auth')        
        },10000000 );
    },[])

    return(
        <AuthContext.Provider value={[auth,setAuth]} >
            {children}
        </AuthContext.Provider>

    )
    
}

//Creating Custom Hook

const useAuth = () =>useContext(AuthContext)

export {useAuth, AuthProvider} 

