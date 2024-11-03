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
            logout: false,
            userId: localStorage.getItem('userId'),
            user: '',
            error: false,
        };

        this.handleLogout = this.handleLogout.bind(this);
    }
    async componentDidMount()
    {
        try
        {
            const userId = localStorage.getItem('userId');
            const res = await fetch(`/api/users/${userId}`);
            const data = await res.json();

            if(res.ok)
            {
                this.setState({user: data.data});
            }
            else
            {
                console.error(data.message);
                this.setState({error: true});
            }
        }
        catch(error)
        {
            console.error("Error when getting user: ", error);
            this.setState({error: true});
        }
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

    displayNav()
    {
        const {user} = this.state;
        const {error} = this.state;
        if(error)
        {
            return(
                <nav>
                    <img src = {logo} alt = "Sound Sync Logo" title = "Sound Sync Logo"/>

                    <SearchComponent/>

                    <ul>
                        <li><Link to = '/Home'>Home</Link></li>
                        <li><Link to = '/SongFeedPage/feed'>Song Feed</Link></li>
                        <li><Link to = '/PlaylistFeedPage/feed'>playlist Feed</Link></li>
                        <li><Link to = {`/ProfilePage/${this.state.userId}`}><img src = {profilePic} alt = "Profile Picture" title = "Profile Picture"/></Link></li>
                        <li><button onClick={this.handleLogout}>Logout</button></li>
                    </ul>  
                </nav>
            );
        }
        else
        {
            return(
                <nav className="bg-cWhite p-4 flex items-center justify-between shadow-lg rounded-lg">
                    <img src={logo} alt="Sound Sync Logo" title="Sound Sync Logo" className="h-12 mx-4" /> 

                    <SearchComponent />
                    

                    <div className="flex space-x-12 items-center mx-4"> 
                        <Link to='/Home' className="text-cBlack hover:text-cPink transition duration-200 font-semibold">Home</Link>
                        <Link to='/SongFeedPage/feed' className="text-cBlack hover:text-cPink transition duration-200 font-semibold">Song Feed</Link>
                        <Link to='/PlaylistFeedPage/feed' className="text-cBlack hover:text-cPink transition duration-200 font-semibold">Playlist Feed</Link>
                    </div>

                    <Link to={`/ProfilePage/${this.state.userId}`}>
                        <img src={user.profilePicture} alt="Profile Picture" title="Profile Picture" className="h-12 w-12 rounded-full border-2  mx-4 transition-transform transform hover:scale-110" /> 
                    </Link>

                    <button onClick={this.handleLogout} className="text-cBlack hover:text-cPink transition duration-200 mx-4 font-semibold">Logout</button> 
                </nav>
            );
        }

    }

    async logOut()
    {
        try
        {
            const res = await fetch(`/api/users/${this.state.userId}`);
            
            if(res.ok)
            {
                localStorage.removeItem('userId');
                return;
            }
            else
            {
                console.error(res.json().message);
            }
        }
        catch(error)
        {
            console.error("Error logging out: ", error);
        }
    }
    
    render()
    {
        const {user} = this.state;
        if(this.state.logout === true)
        {
            this.logOut();
            return <Navigate to = '/'/>
        }

        return(
            <div>
                {this.displayNav()}

            </div>
        );
    }
}
export default Nav;