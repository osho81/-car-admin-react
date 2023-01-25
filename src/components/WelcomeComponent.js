import React from 'react';
import { Link } from 'react-router-dom';

function WelcomeComponent(props) {
    return (
        <div className='welcome-main'>
            <h2 style={{ fontWeight: 800 }}>Welcome To Car Rentals</h2>
            <br></br>
            {/* Links styled as a buttons: */}
            <Link to="/customers" className="btn btn-primary">All Customers</Link>{" "}
            <Link to="/tr-accounts" className="btn btn-primary">All Accounts</Link>{" "}
            <Link to="/allcars" className="btn btn-primary">List All Cars</Link>
        </div>
    );
}

export default WelcomeComponent;