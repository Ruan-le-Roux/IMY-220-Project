import React from 'react';

import Nav from '../components/Nav';
import ProfileComponent from '../components/ProfileComponent';
import ProfilePreview from '../components/ProfilePreview';
import EditProfile from '../components/EditProfile';
import MyPlaylists from '../components/MyPlaylists';
import FollowingComponent from '../components/FollowingComponent';
import FollowerComponent from '../components/FollowerComponent';
import CreatePlaylist from '../components/CreatePlaylist'

import ProfilePreviewFollowers from '../components/ProfilePreviewFollowers';
import ProfilePreviewFollowing from '../components/ProfilePreviewFollowing';

import profilePic from '../../public/assets/images/profile-pic.png';
import instagram from '../../public/assets/images/instagram.png';
import facebook from '../../public/assets/images/facebook.png';
import tiktok from '../../public/assets/images/tiktok.png';
import twitter from '../../public/assets/images/twitter.png';
import { useParams } from 'react-router-dom';

const ProfilePage = () => 
{
    const {userId} = useParams();
    return(
        <div>
            <Nav />

            <main className="flex flex-col items-center bg-cBlue">
                <ProfileComponent userId={userId} className="mb-4 " />
                {/* <ProfileComponent onPlaylistCreated={refreshPlaylists}/> */}

                <MyPlaylists userId={userId} className="mb-4" />
                <hr/>
                <hr/>
                <hr/>
                {/* <MyPlaylists ref={myPlaylistsRef}/> */}

                {/* <ProfilePreview/> */}

                <div>

                <ProfilePreviewFollowing userId={userId} className="mb-4" />
                </div>

                <hr/>
                <hr/>
                <hr/>
                <div>

                <div>
                <ProfilePreviewFollowers userId={userId} className="mb-4" />

                </div>
                </div>

            </main>
        </div>
    );
}

export default ProfilePage;