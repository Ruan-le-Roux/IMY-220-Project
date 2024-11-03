import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

import Nav from '../components/Nav';
import MyPlaylists from '../components/MyPlaylists';
import Songs from '../components/Songs';
import Activity from '../components/Activity';
import FollowingComponent from '../components/FollowingComponent';
import FollowerComponent from '../components/FollowerComponent';

const FriendsPage = () =>
{
    const {type} = useParams();
    const location = useLocation();
    const {userId} = location.state;
    if(type === 'fol')
    {
        return(
            <div>
                <Nav/>
    
                <FollowingComponent userId={userId}/>
            </div>
        );
    }
    else
    {
        return(
            <div>
                <Nav/>
    
                <FollowerComponent userId={userId}/>
            </div>
        );

    }
}

export default FriendsPage;