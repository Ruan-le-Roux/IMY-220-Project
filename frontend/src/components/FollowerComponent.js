import React from 'react';

import profilePic from '../../public/assets/images/profile-pic.png';

import ProfilePreviewFollowers from './ProfilePreviewFollowers';

class FollowerComponent extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            followers: true,
        };

        this.closeComponent = this.closeComponent.bind(this);
    }

    closeComponent()
    {
        this.setState({followers: false});
        
    }

    render()
    {
        const { followers } = this.state;

        if(!this.state.followers)
        {
            return <ProfilePreviewFollowers/>

        }
        return(
            <div>
                <h2>Followers</h2>

                {(followers) && (<button onClick = {this.closeComponent}>Close</button>)}

                <div>
                    <img src = {profilePic} alt = 'Profile picture' title = 'Profile picture'/>
                    
                    <h3>Username</h3>
                </div>
                <div>
                    <img src = {profilePic} alt = 'Profile picture' title = 'Profile picture'/>
                    
                    <h3>Username</h3>
                </div>
                <div>
                    <img src = {profilePic} alt = 'Profile picture' title = 'Profile picture'/>
                    
                    <h3>Username</h3>
                </div>
                <div>
                    <img src = {profilePic} alt = 'Profile picture' title = 'Profile picture'/>
                    
                    <h3>Username</h3>
                </div>
            </div>
        );
    }
}

export default FollowerComponent;