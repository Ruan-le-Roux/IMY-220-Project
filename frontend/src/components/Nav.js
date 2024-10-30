import React from 'react';
import { Link, Navigate} from 'react-router-dom'

import logo from '../../public/assets/images/logo.png';
import profilePic from '../../public/assets/images/profile-pic.png';

import SearchComponent from './SearchComponent';

class Nav extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            logout: false
        };

        this.handleLogout = this.handleLogout.bind(this);
    }
    
    async handleLogout() 
    {
        try
        {
            const userId = localStorage.getItem('userId');
            const res = await fetch(`/api/users/logout/${userId}`);
            
            if(res.ok)
            {
                localStorage.removeItem('userId');
                this.setState({logout: true});
            }
            else
            {
                const error = await res.json();
                console.error("could not logout user: ", error);
                window.alert('Error occurred could not logout user');
            }
        }
        catch(error)
        {
            console.error("Error when logout: ", error);
        }

    }
    
    render()
    {
        if(this.state.logout === true)
        {
            return <Navigate to = '/'/>
        }

        return(
            <nav>
                <img src = {logo} alt = "Sound Sync Logo" title = "Sound Sync Logo"/>

                <SearchComponent/>

                <ul>
                    <li><Link to = '/Home'>Home</Link></li>
                    <li><Link to = '/SongFeedPage'>Song Feed</Link></li>
                    <li><Link to = '/PlaylistFeedPage'>playlist Feed</Link></li>
                    <li><Link to = '/ProfilePage/1'><img src = {profilePic} alt = "Profile Picture" title = "Profile Picture"/></Link></li>
                    <li><button onClick={this.handleLogout}>Logout</button></li>
                </ul>                
            </nav>
        );
    }
}
export default Nav;