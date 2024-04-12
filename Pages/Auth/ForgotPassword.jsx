import React, { useState } from 'react';
import Layout from '../../Components/Layout/Layout';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import backendUrl from '../../src/config';

const ForgotPassword = () => {

    const navigate = useNavigate()

    const [formValue,setFormValue] = useState({emailID:"",answer:"",newPassword:""})

    const [showPassword, setShowPassword] = useState(false);


    const handleChange =(e)=>{
        const {name,value}=e.target
        setFormValue({...formValue,[name]:value})

    }

    const handleSubmit =async()=>{

        const res = await axios.post(`${backendUrl}/api/user/forgot-password`,formValue)

        if(res.data.success)
        {
            toast.success(res.data.message)
            navigate('/login')
        }
        else{
            toast.error(res.data.message)
        }

    }

    function togglePasswordVisibility (){
        setShowPassword(!showPassword)
    }


    return (
        <div>
            <Layout>
            < div className="register">
                    <h1>Forgot pasword</h1>
                    {/* <form> */}

                    <div className="mb-3">
                        <input style={{padding:'10px'}}
                            type="email"
                            className="form-control"
                            value={formValue.emailID}
                            name="emailID"
                            onChange={handleChange}
                            id="exampleInputEmail"
                            placeholder='Enter your emailId'
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input style={{padding:'10px'}}
                            type="type"
                            className="form-control"
                            value={formValue.answer}
                            name="answer"
                            onChange={handleChange}
                            id="exampleInputPassword1"
                            placeholder='Enter your favorite'
                            required />
                    </div>

                    <div className="mb-3">
                        <input style={{padding:'10px'}}
                            type={showPassword ? "text" :"password"} 
                            className="form-control"
                            value={formValue.password}
                            name="newPassword"
                            onChange={handleChange}
                            id="exampleInputPassword1"
                            placeholder='Enter new password'
                            required />

                                <label style={{display :'flex',alignItems : 'center' ,fontSize:'14px',marginTop:'5px',fontFamily: 'ariel'}}> 
                                <input style={{marginRight:"5px"}} type="checkbox" onClick={togglePasswordVisibility}></input>
                                Show password</label>
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Reset password</button>


                    {/* </form> */}

                </div>
            </Layout >
        </div>
    );
};

export default ForgotPassword;