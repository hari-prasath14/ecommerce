import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Components/Layout/Layout';

const Pagenotfound = () => {
    return (
        <Layout>
        <div className='pnf'>
            <h1 className='pnf-title text-center'>404</h1>
            <h2 className='pnf-heading'>OOPS ! PAGE NOT FOUND</h2>
            <Link to='/'><button style={{padding:"10px",hoverColor: "black"}}>GO BACK</button></Link>
            
        </div>
        </Layout>
    );
};

export default Pagenotfound;