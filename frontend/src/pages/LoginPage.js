import React from 'react';
import logo from '../../public/assets/images/logo.png';
import LoginComponent from '../components/LoginComponent';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    return (
        <main className="flex items-center justify-center min-h-screen bg-cBlue">
            <div className="flex flex-col items-center bg-cWhite p-10 rounded-lg shadow-lg max-w-md w-full">
                <img src={logo} alt="Sound Sync logo" title="Sound Sync logo" className="mb-6 w-32" />

                <h1 className="text-2xl font-bold text-cBlack">Login</h1>

                <LoginComponent />

                <p className="text-cBlack">
                    <small>Don't have an account? <Link to='/RegisterPage' className="text-blue-600 hover:text-cPink underline">Register here</Link></small>
                </p>
            </div>
        </main>
    );
};

export default LoginPage;
