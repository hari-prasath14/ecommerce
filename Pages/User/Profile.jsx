import React, { useEffect, useState } from 'react';
import UserMenu from '../../Components/Layout/UserMenu';
import Layout from '../../Components/Layout/Layout';
import { useAuth } from '../../src/Context/AuthProvider';
import toast from 'react-hot-toast';
import axios from 'axios';
import backendUrl from '../../src/config';

const Profile = () => {

  const [auth, setAuth] = useAuth()

  // const [formValue, setFormValue] = useState({ firstName: "", lastName: "", emailID: "", mobileNumber: "", password: "", answer: "" })

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [emailID, setEmailID] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")
  const [password, setPassword] = useState("")
  const [address, setAddress] = useState("")


  async function handleSubmit(e) {
    // e.preventDefault()
    try {
      const { data } = await axios.put(`${backendUrl}/api/user/update`, {
        firstName,
        lastName,
        emailID,
        mobileNumber,
        password,
        address,
      })

      if (data?.error) {
        toast.error(data?.error)
      }
      else {
        setAuth({ ...auth, findUser: data?.updatedUser })
        let ls = localStorage.getItem('auth')
        ls = JSON.parse(ls)
        ls = data.updatedUser
        localStorage.setItem('auth', JSON.stringify(ls))
        toast.success('Profile updated successfully')
      }
    }
    catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }

  }

  // function handleChange(e) {
  //   const { name, value } = e.target
  //   setFormValue({ ...formValue, [name]: value })
  // }

  useEffect(() => {
    const { firstName, lastName, mobileNumber, emailID , address} = auth.user
    setFirstName(firstName)
    setLastName(lastName)
    setEmailID(emailID)
    setMobileNumber(mobileNumber)
    setAddress(address)
  }, [auth.user])




  return (
    <Layout title={'Dashboard - Profile'}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            < div className="register">
              <h1>USER PROFILE</h1>
              {/* <form> */}
              <div className="mb-3">


                <input
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

              <div className="mb-3">
                <input
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

              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  value={emailID}
                  name="emailID"
                  onChange={(e) => setEmailID(e.target.value)}
                  id="exampleInputEmail"
                  placeholder='Enter your emailId'
                  disabled
                />
              </div>

              <div className="mb-3">
                <input
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

              <div className="mb-3">
                <input
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

              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  name="password"
                  onChange={(e) =>{ setPassword(e.target.value)}}
                  id="exampleInputPassword1"
                  placeholder='Enter your password'
                  required />
              </div>

              <div className="mb-3">
                <input
                  type="input"
                  className="form-control"
                  value={address}
                  name="address"
                  onChange={(e) => setAddress(e.target.value)}
                  id="exampleInputAddress"
                  placeholder='Enter your Address'
                  required
                />
              </div>


              <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Update</button>
              {/* </form> */}

            </div>
          </div>

        </div>
      </div>

    </Layout>
  );
};

export default Profile;