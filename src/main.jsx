import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './Context/AuthProvider.jsx'
import { SearchProvider } from './Context/SearchProvider.jsx'
import { CartProvider } from './Context/CartProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <AuthProvider>
        <SearchProvider>
                <CartProvider>
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                </CartProvider>
        </SearchProvider>
    </AuthProvider>
)
