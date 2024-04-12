import React from 'react';
import Layout from '../Components/Layout/Layout';
import { Container, Row, Col } from 'react-bootstrap';

const Aboutpage = () => {
    return (
        <Layout>

<div className="about-container">
      <div className="about-content">
        <h2>About Us</h2>
        <p>Welcome to our eCommerce website. We are dedicated to providing you with the best shopping experience.</p>
        <p>Our goal is to offer a wide range of high-quality products at affordable prices. Whether you're looking for electronics, clothing, or home decor, we've got you covered.</p>
        <p>At our store, customer satisfaction is our top priority. If you have any questions or concerns, please don't hesitate to contact us.</p>
      </div>
      <div className="about-image">
        <img src='./Images/contact.jpg' alt="About Us" />
      </div>
    </div>
        </Layout>
    );
};

export default Aboutpage;