import React from 'react';
import { Navigate } from 'react-router-dom';

import EditProfile from './EditProfile';
import CreatePlaylist from './CreatePlaylist';

import profilePic from '../../public/assets/images/album-cover.png';
import instagram from '../../public/assets/images/instagram.png';
import facebook from '../../public/assets/images/facebook.png';
import tiktok from '../../public/assets/images/tiktok.png';
import twitter from '../../public/assets/images/twitter.png';

class ProfileComponent extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            edit: false,
            playlist: false,
            addSong: false,
        };

        this.editProfile = this.editProfile.bind(this);
        this.createPlaylist = this.createPlaylist.bind(this);
        this.addSong = this.addSong.bind(this);
    }

    editProfile()
    {
        this.setState({edit: true});
    }

    createPlaylist()
    {
        this.setState({playlist: true});
    }

    addSong()
    {
        this.setState({addSong: true});

    }


    render()
    {
        if(this.state.addSong)
        {
            return <Navigate to = '/AddSongPage'/>
        }


        return(
            <div>
                {/* <img src = {profilePic} alt = 'Profile picture' title = 'Profile picture'/> */}
                
                <div>
                    <h3>Name</h3>
                    <p>Ruan le Roux</p>
                    

                    <h3>Social Media</h3>
                    <div>
                        <img src = {instagram} alt = 'Instagram Logo' title = 'Instagram Logo'/>
                        <img src = {facebook} alt = 'Facebook Logo' title = 'Facebook Logo'/>
                        <img src = {tiktok} alt = 'Tiktok Logo' title = 'Tiktok Logo'/>
                        <img src = {twitter} alt = 'Twitter Logo' title = 'Twitter Logo'/>
                    </div>

                    <h3>Bio</h3>

                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris rhoncus eros eu lacinia faucibus. Nullam hendrerit, 
                        enim at aliquam laoreet, ex eros placerat quam, at mollis sem nulla id urna.
                    </p>

                    <button onClick = {this.editProfile}>Edit</button>
                    <button onClick = {this.createPlaylist}>Create playlist!</button>
                    <button onClick = {this.addSong}>Add song!</button>
                </div>

                {this.state.edit && <EditProfile/>}
                {this.state.playlist && <CreatePlaylist/>}
            </div>
        );
    }
}

export default ProfileComponent;