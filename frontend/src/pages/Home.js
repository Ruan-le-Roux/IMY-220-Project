import React from 'react';

import Nav from '../components/Nav';
import MyPlaylists from '../components/MyPlaylists';
import Songs from '../components/Songs';
import Activity from '../components/Activity';

const Home = () =>
{
    const userId = localStorage.getItem('userId');
    return(
        <div>
            <Nav/>

            <MyPlaylists userId={userId}/>

            <Songs/>

            <Activity/>
        </div>
    );
}

export default Home;