import React from 'react';

import Nav from '../components/Nav';
import ProfileComponent from '../components/ProfileComponent';
import ProfilePreview from '../components/ProfilePreview';
import EditProfile from '../components/EditProfile';
import MyPlaylists from '../components/MyPlaylists';
import FollowingComponent from '../components/FollowingComponent';
import FollowerComponent from '../components/FollowerComponent';
import CreatePlaylist from '../components/CreatePlaylist'

import profilePic from '../../public/assets/images/profile-pic.png';
import instagram from '../../public/assets/images/instagram.png';
import facebook from '../../public/assets/images/facebook.png';
import tiktok from '../../public/assets/images/tiktok.png';
import twitter from '../../public/assets/images/twitter.png';

const ProfilePage = () => 
{
    return(
        <div>
            <Nav/>

            <main>
                <ProfileComponent/>

                <MyPlaylists/>

                <ProfilePreview/>


                

                <div></div>
            </main>
        </div>
    );
}

export default ProfilePage;