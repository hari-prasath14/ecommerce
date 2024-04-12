import React, { useState } from 'react';
import Layout from '../Components/Layout/Layout';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const ContactPage = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
      };
    return (
        <Layout>
             <div className="contact-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleChange} required />
        </div>
        <button type="submit" style={{borderRadius:'10px',backgroundColor:'rgb(5, 56, 107)',fontFamily:'cursive'}}>Submit</button>
      </form>
      <div className="contact-info">
        <h3>Our Location</h3>
        <p>18 aaa Street</p>
        <p>Chennai, TamilNadu, 600233</p>
        <h3>Contact Details</h3>
        <p>Email: newecommerce@example.com</p>
        <p>Phone: 6738843634</p>
      </div>
    </div>
           
            
        </Layout>
    );
};

export default ContactPage;