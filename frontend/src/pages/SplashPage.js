import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../public/assets/images/logo.png';

const SplashPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-cBlue">
            <main className="flex flex-col items-center bg-cWhite p-8 rounded-lg shadow-lg max-w-md w-full">
                <img src={logo} alt="Sound Sync logo" title="Sound Sync logo" className="mb-6 w-32" />

                <h3 className="text-center text-xl font-bold mb-4 text-gray-800">
                    Curate Your Tunes, Sync Your Beats, Enjoy the Rhythm
                </h3>

                <p className="text-center text-gray-600 mb-6">
                    Manages playlists, songs, and friends all in one place!
                </p>

                <div className="flex space-x-4">
                    <Link to='/LoginPage'>
                        <button className="bg-cBlue text-white py-2 px-4 rounded-lg hover:bg-cPink transition duration-200">
                            Sign-in
                        </button>
                    </Link>
                    <Link to='/RegisterPage'>
                        <button className="bg-cPink text-white py-2 px-4 rounded-lg hover:bg-cBlue transition duration-200">
                            Register
                        </button>
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default SplashPage;
