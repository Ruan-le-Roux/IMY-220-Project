import React from 'react';
import { Link } from 'react-router-dom'

import logo from '../../public/assets/images/logo.png';
import profilePic from '../../public/assets/images/profile-pic.png';

import SearchComponent from './SearchComponent';

class Nav extends React.Component
{
    render()
    {
        return(
            <nav>
                <img src = {logo} alt = "Sound Sync Logo" title = "Sound Sync Logo"/>

                <SearchComponent/>

                <ul>
                    <li><Link to = '/Home'>Home</Link></li>
                    <li><Link to = '/SongFeedPage'>Song Feed</Link></li>
                    <li><Link to = '/PlaylistFeedPage'>playlist Feed</Link></li>
                    <li><Link to = '/ProfilePage/1'><img src = {profilePic} alt = "Profile Picture" title = "Profile Picture"/></Link></li>
                </ul>                
            </nav>
        );
    }
}
export default Nav;