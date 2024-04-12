import React from 'react';
import { Button } from 'react-bootstrap';
import Layout from '../Components/Layout/Layout';


const PaymentFailure = () => {
  return (
    <Layout>
      <div className="payment-failure-container">
    <div className="payment-failure-content">
      <h2 className="text-danger">Payment Failed</h2>
      <p className="lead">Oops! It seems there was an issue in processing your payment.</p>
      <p className="mb-4">Don't worry, we're here to help. Please try again later or contact customer support for assistance.</p>
      <Button variant="primary" onClick={() => window.history.back()}>Go Back</Button>
    </div>
  </div>
    </Layout>
  );
}

export default PaymentFailure;