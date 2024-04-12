import React from 'react';
import { Routes , Route } from "react-router-dom";
import Homepage from '../Pages/Homepage';
import Layout from '../Components/Layout/Layout';
import Aboutpage from '../Pages/Aboutpage';
import ContactPage from '../Pages/ContactPage';
import Pagenotfound from '../Pages/Pagenotfound';
import Privacypolicy from '../Pages/Privacypolicy';
import Resgister from '../Pages/Auth/Resgister';
import Login from '../Pages/Auth/Login';
import Dashboard from '../Pages/User/Dashboard';
import Private from '../Components/Routes/Private';
import ForgotPassword from '../Pages/Auth/ForgotPassword';
import AdminDashboard from '../Pages/Admin/AdminDashboard';
import AdminRoute from '../Components/Routes/AdminRoute';
import CreateCategory from '../Pages/Admin/CreateCategory';
import CreateProduct from '../Pages/Admin/CreateProduct';
import Users from '../Pages/Admin/Users';
import Profile from '../Pages/User/Profile';
import Orders from '../Pages/User/Orders';
import Products from '../Pages/Admin/Products';
import UpdateProduct from '../Pages/Admin/UpdateProducts';
import SearchPage from '../Pages/SearchPage';
import ProductDetailsPage from '../Pages/ProductDetailsPage';
import CategoryProducts from '../Pages/CategoryProducts';
import CartPage from '../Pages/CartPage';
import PaymentFailure from '../Pages/PaymentFailure';
import AdminOrder from '../Pages/Admin/AdminOrder';
import PaymentSuccess from '../Pages/PaymentSuccess';

const App = () => {
  return (
    <div>
      
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/search' element={<SearchPage />}/>
        <Route path='/productDetail/:slug' element={<ProductDetailsPage />}/>
        <Route path='/cart' element={<CartPage />}/>
        <Route path='/about' element={<Aboutpage/>}/>
        <Route path='/contact' element={<ContactPage/>}/>
        <Route path='/about' element={<Aboutpage/>}/>
        <Route path='/privacy' element={<Privacypolicy/>}/>
        <Route path='/register' element={<Resgister/>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/forgotpassword' element={<ForgotPassword />}/>
        <Route path='/category/:slug' element={<CategoryProducts/>}/>
        <Route path='/payment-failure' element={<PaymentFailure />}/>
        <Route path='/payment-success' element={<PaymentSuccess />}/>
        

        <Route path='/dashboard' element={<Private />}>
        <Route path='user' element={<Dashboard />}/>
        <Route path='user/profile' element={<Profile />}/>
        <Route path='user/orders' element={<Orders />}/>
        </Route>


        <Route path='/dashboard' element={<AdminRoute />}>
        <Route path='admin' element={<AdminDashboard />}/>
        <Route path='admin/create-category' element={<CreateCategory />}/>
        <Route path='admin/create-products' element={<CreateProduct />}/>
        <Route path='admin/products/:slug' element={<UpdateProduct />}/>
        <Route path='admin/products' element={<Products />}/>
        <Route path='admin/users' element={<Users />}/>
        <Route path='admin/orders' element={<AdminOrder />}/>
        </Route>

        {/* <Route path='/login' element={<Privacypolicy/>}/> */}

        <Route path='/*' element={<Pagenotfound/>}/>
      </Routes>

      
      
      
     
    </div>
  );
};

export default App;