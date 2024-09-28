import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../public/assets/images/logo.png';
// import logo from '../public/assets/images/logo.png';

const SplashPage = () => {
    return(
        <div>
            <main>
                <img src = {logo} alt = "Sound Sync logo" title = "Sound sync logo"/>

                <h3>Curate Your Tunes, Sync Your Beats, Enjoy the Rhythm</h3>

                <p>Manages playlists, songs and fiends all in one place!</p>

                <Link to = '/LoginPage'><button>Sign-in</button></Link>
                <Link to = '/RegisterPage'><button>Register</button></Link>
            </main>
        </div>
    );
};

export default SplashPage;