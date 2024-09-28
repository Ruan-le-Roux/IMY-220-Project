import React from 'react';

import profilePic from '../../public/assets/images/profile-pic.png';

import ProfilePreviewFollowing from './ProfilePreviewFollowing';

class FollowingComponent extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            following: true,
        };

        this.closeComponent = this.closeComponent.bind(this);
    }
    closeComponent()
    {
        this.setState({following: false});
        
    }

    render()
    {
        const { following } = this.state;

        if(!this.state.following)
        {
            return <ProfilePreviewFollowing/>
        }

        return(
            <div>
                <h2>Following</h2>


                {(following) && (<button onClick = {this.closeComponent}>Close</button>)}

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

export default FollowingComponent;