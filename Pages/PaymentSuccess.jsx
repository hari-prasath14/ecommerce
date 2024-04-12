import React, { useEffect } from 'react';
import Layout from '../Components/Layout/Layout';

const PaymentSuccess = () => {

  return (
    <Layout>

    <div className="payment-success-container">
      <div className="payment-success-content">
        <h2 className="payment-success-title">Payment Successful!</h2>
        <p className="payment-success-message">Thank you for your purchase.</p>
        
      </div>
    </div>
    </Layout>

  );
};

export default PaymentSuccess;