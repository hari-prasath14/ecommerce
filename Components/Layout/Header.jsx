import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FiShoppingBag } from "react-icons/fi";
import { useAuth } from '../../src/Context/AuthProvider';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import SearchInput from '../Forms/SearchInput';
import useCategory from '../../src/Hooks/useCategory';
import { useCart } from '../../src/Context/CartProvider';
import {Badge} from 'antd'
import { NavLink } from 'react-router-dom';



const Header = () => {

  const [cart,setCart] = useCart()


  const [auth, setAuth] = useAuth()

  const categories = useCategory()

  const navigate =useNavigate()

  const handleCheck =()=>{
    
    if(auth?.user?.role=== "admin"){
      navigate('/dashboard/admin')
    }
    else{
      navigate('/dashboard/user')
    }

  }

  const handleLogout = () => {

    
    setAuth({
      ...auth,
      user: null,
      token: "",

    })

    localStorage.removeItem("auth")  

    navigate('/login')

    toast.success('Logout Successfully')




  }
  return (
    <div >
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary navbar" >
        <Container fluid style={{ backgroundColor: '#5CDB95' }}>
          <Navbar.Brand href="#home" className='NavbarBrand'    style={{display:'flex',alignItems:'center'}}><FiShoppingBag />E-COMMERCE</Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>

          <SearchInput />


          <Navbar.Collapse id="responsive-navbar-nav">

            <Nav className="ms-auto">
              <Nav.Link href="/" style={{color:'#EDF5E1',fontFamily:'cursive',fontWeight: 'bold'}}>Home</Nav.Link>
              <NavDropdown title='Categories' id="basic-nav-dropdown" style={{color:'#05386B',fontFamily:'cursive',fontWeight: 'bold'}} >
                {/* <NavDropdown.Item onClick={() => navigate('/categories')}>All Category</NavDropdown.Item> */}


                  {categories?.map((c) => (
                  
                  <NavDropdown.Item style={{fontFamily:'cursive',fontWeight: 'bold'}} onClick={() => navigate(`/category/${c.slug}`)}>{c.name}</NavDropdown.Item>

                  ))}
              </NavDropdown>    

              {
                !auth.user ? (
                  <>
                    <Nav.Link href="/login" style={{color:'#EDF5E1',fontFamily:'cursive',fontWeight: 'bold'}}>Login</Nav.Link>
                    <Nav.Link href="/register" style={{color:'#EDF5E1',fontFamily:'cursive',fontWeight: 'bold'}}>Signup</Nav.Link>


                  </>
                ) : (
                  <>

                    <NavDropdown title={auth.user.firstName} id="basic-nav-dropdown" style={{color:'#EDF5E1',fontFamily:'cursive',fontWeight: 'bold'}}>
                      <NavDropdown.Item onClick={handleCheck} id = 'dd1'style={{fontFamily:'cursive',fontWeight: 'bold'}} >DashBoard</NavDropdown.Item>
                      <NavDropdown.Item onClick={handleLogout} style={{fontFamily:'cursive',fontWeight: 'bold'}}>Logout</NavDropdown.Item>

                      
                    </NavDropdown>

                     



                  </>
                )

                 

              }

            </Nav>
            
             
             <Badge count={cart?.length} >
            <Nav.Link href='/cart' style={{color:'#EDF5E1',fontFamily:'cursive',fontWeight: 'bold'}}>Cart</Nav.Link>
          </Badge> 
            
            

          </Navbar.Collapse>

        </Container>
      </Navbar>
    </div>
  );
};

export default Header;




{/* <Nav.Link onClick={handleLogout} >Logout</Nav.Link> */}
