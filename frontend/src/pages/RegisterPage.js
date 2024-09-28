import React from 'react';
import { Link } from 'react-router-dom';

import RegisterInfo from '../components/RegisterInfoForm';
import ProfileInfo from '../components/ProfileInfoForm';

import logo from '../../public/assets/images/logo.png';
// import logo from '../public/assets/images/logo.png';
// import instagram from './frontend/public/assets/images/instagram.png';
// import facebook from './frontend/public/assets/images/facebook.png';
// import tiktok from './frontend/public/assets/images/tiktok.png';
// import twitter from './frontend/public/assets/images/twitter.png';

// const submitForm = (e) => {
//     e.preventDefault();

// };

const RegisterPage = () => 
{    
    return(
        <main>
            <img src = {logo} alt = "Sound Sync logo" title = "Sound sync logo"/>

            <h1>Register</h1>

            <RegisterInfo/>

            <p><small>Already have an account? <Link to = '/LoginPage'>Login here</Link></small></p>
        </main>
    );
}

export default RegisterPage;