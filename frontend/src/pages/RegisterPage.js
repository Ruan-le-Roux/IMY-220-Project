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
        <main className="flex flex-col items-center justify-center min-h-screen bg-cBlue p-6">
            <div className="bg-cWhite p-8 rounded-lg shadow-lg max-w-md w-full">
                {/* Centering the logo and heading */}
                <div className="flex flex-col items-center mb-4">
                    <img src={logo} alt="Sound Sync logo" title="Sound sync logo" className="mb-4" />
                    <h1 className="text-cBlack text-2xl font-bold">Register</h1>
                </div>

                {/* Registration Info Component */}
                <RegisterInfo type='r' />

                {/* Centering the bottom text */}
                <p className="mt-4 text-center">
                    <small className="text-cBlack">
                        Already have an account? <Link to='/LoginPage' className="text-cPink hover:text-cPink underline">Login here</Link>
                    </small>
                </p>
            </div>
        </main>
    );
}

export default RegisterPage;