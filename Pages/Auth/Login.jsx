import React, { useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate,useLocation } from 'react-router-dom';
import { useAuth } from '../../src/Context/AuthProvider';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {

    const [auth,setAuth]= useAuth()
    const [showPassword, setShowPassword] = useState(false);


    const navigate = useNavigate()
    const location = useLocation()

    const [formValue,setFormValue]= useState({emailID:"",password:""})

    function handleChange(e){          

            const{name,value}=e.target
            setFormValue({...formValue,[name]:value})
        
    }
   

    async function handleSubmit(e){
        try{
            e.preventDefault()
            const res = await axios.post("http://localhost:4000/api/user/login",formValue)

            if(res.data.success){
                setAuth({...auth,
                user:res.data.findUser,
                token:res.data.token
            })
                localStorage.setItem("auth",JSON.stringify(res.data))
                navigate(location.state || "/" )
            }
            else{
                toast.error(res.data.message)

            }

        }
        catch(err){
            console.log(err);
        }
    }

    function togglePasswordVisibility (){
        setShowPassword(!showPassword)
    }

    return (
        <div>
             <Layout>
    < div className="register" style={{backgroundColor:'#ebfbf5'}}>
      <h1 style={{color:'#061510',fontFamily:'cursive',marginBottom:'15px'}}>Login</h1>
  

  <div className="mb-3">
    <input style={{padding:'10px'}}
    type="email" 
    className="form-control" 
    value ={formValue.emailID} 
    name = "emailID" 
    onChange={handleChange}
    id="exampleInputEmail" 
    placeholder='enter your emailId' 
    
    />
  </div>

  <div className="mb-3">
    <input style={{padding:'10px'}}
    type={showPassword ? "text" :"password"} 
    className="form-control" 
    value ={formValue.password} 
    name = "password" 
    onChange={handleChange}
    id="exampleInputPassword1" 
    placeholder='enter your password' 
    required/>

  <label style={{display :'flex',alignItems : 'center' ,fontSize:'14px',marginTop:'5px',fontFamily: 'ariel'}}> 
  <input style={{marginRight:"5px"}} type="checkbox" onClick={togglePasswordVisibility}></input>
  Show password</label>
        
    
  </div>
  <a className="mb-3" style={{textDecoration:'none',color:'#061510',fontFamily:'cursive',fontSize:'12px'}} href="/forgotpassword">Forgot password?</a>
  

  
  

  <button type="submit" className="btn btn-primary" style={{padding:'5px 15px',color:'#061510',backgroundColor:"#38D59C",fontFamily:'cursive' ,border:'none'}} onClick={handleSubmit}>login</button>

  


  </div>
    </Layout >
        </div>
    );
};

export default Login;