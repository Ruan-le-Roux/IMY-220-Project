import React from 'react';

import Nav from '../components/Nav';
import MyPlaylists from '../components/MyPlaylists';
import Songs from '../components/Songs';
import Activity from '../components/Activity';

const Home = () =>
{
    const userId = localStorage.getItem('userId');
    return(
        <div className="bg-cBlue min-h-screen text-cWhite">
            <Nav />

            <div className="container mx-auto p-6 space-y-8">
                <MyPlaylists userId={userId} />
                
                <Songs />
                
                <Activity />
            </div>
        </div>

    );
}

export default Home;