import React from 'react';

import logo from '../../public/assets/images/logo.png';

import LoginComponent from '../components/LoginComponent';


const LoginPage = () => {
    return(
        <main>
            <img src = {logo} alt = "Sound Sync logo" title = "Sound sync logo"/>

            <h1>Login</h1>

            <LoginComponent/>
        </main>
    );
};

export default LoginPage;