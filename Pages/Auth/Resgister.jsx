import React, { useState } from 'react';
import axios from 'axios'
import Layout from '../../Components/Layout/Layout';
// import { toast } from 'react-toastify';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



const Resgister = () => {


  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [emailID, setEmailID] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")
  const [password, setPassword] = useState("")
  const [address, setAddress] = useState("")
  const [answer, setAnswer] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()



  async function handleSubmit(e) {
    e.preventDefault()
    try {
      if (password.length > 8) {
        setErrorMessage('')
        const res = await axios.post("http://localhost:4000/api/user/register", {
          firstName,
          lastName,
          emailID,
          mobileNumber,
          password,
          address,
          answer
        })

        console.log();

        if (res.data.success) {
          toast.success(res.data.message)

          navigate('/login')
        }
        else {
          toast.error(res.data.message)

        }
      }
      else {
        setErrorMessage('please enter more than 8 characters')
      }

    }


    catch (error) {

    }

  }

  function togglePasswordVisibility() {
    setShowPassword(!showPassword)
  }


  return (
    <Layout>
      < div className="register" style={{ backgroundColor: '#ebfbf5' }}>
        <h1 style={{ color: '#061510', fontFamily: 'cursive', marginBottom: '15px' }}>Register</h1>
        <form >

          <div className='row g-3'>
            <div className="mb-3 col-sm-4">
              <input
              style={{padding:'10px'}}
                type="input"
                className="form-control"
                value={firstName}
                name="firstName"
                onChange={(e) => setFirstName(e.target.value)}
                id="exampleInputfirstname"
                placeholder='Enter your first name'
                required
              />
            </div>


            <div className="mb-3 col-sm-4">
              <input
                style={{padding:'10px'}}
                type="input"
                className="form-control"
                value={lastName}
                name="lastName"
                onChange={(e) => setLastName(e.target.value)}
                id="exampleInputlasrname"
                placeholder='Enter your last name'
                required
              />
            </div>

            <div className="mb-3 col-sm-4">
              <input
                style={{padding:'10px'}}
                type="email"
                className="form-control"
                value={emailID}
                name="emailID"
                onChange={(e) => setEmailID(e.target.value)}
                id="exampleInputEmail"
                placeholder='Enter your emailId'
                required
              />
            </div>

          </div>

          <div className='row g-3'>
            <div className="mb-3 col-sm-4">
              <input
              style={{padding:'10px'}}
                type="input"
                className="form-control"
                value={mobileNumber}
                name="mobileNumber"
                onChange={(e) => setMobileNumber(e.target.value)}
                id="exampleInputphone"
                placeholder='Enter your phone number'
                required
              />
            </div>


            <div className="mb-3 col-sm-4">
              <input
                style={{padding:'10px'}}
                type={showPassword ? "text" : "password"}
                className="form-control"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                id="exampleInputPassword1"
                placeholder='Enter your password'
                required />
              {errorMessage && (
                <p className="error"> {errorMessage} </p>
              )}

              <label style={{display :'flex',alignItems : 'center' ,fontSize:'14px',marginTop:'5px',fontFamily: 'ariel'}}> 
              <input style={{marginRight:"5px"}} type="checkbox" onClick={togglePasswordVisibility}></input>
              Show password</label>
            
            
            </div>

            <div className="mb-3 col-sm-4">
              <input
                style={{padding:'10px'}}
                type="input"
                className="form-control"
                value={answer}
                name="answer"
                onChange={(e) => setAnswer(e.target.value)}
                id="exampleInputPassword1"
                placeholder='Enter your favorite'
                required />
            </div>
          </div>


          <div className="mb-3">
            <textarea
              type="textarea"
              className="form-control"
              value={address}
              name="address"
              onChange={(e) => setAddress(e.target.value)}
              id="exampleInputaddress"
              placeholder='Enter your Address...'
              required
            />
          </div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <button type="submit" className="btn btn-primary " style={{ padding: '5px 15px', color: '#061510', backgroundColor: "#38D59C", fontFamily: 'cursive', border: 'none' }} onClick={handleSubmit}>Register</button>
          </div>

        </form>

      </div>
    </Layout >

  )
};

export default Resgister;









