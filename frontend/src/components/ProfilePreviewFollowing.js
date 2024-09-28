import React from 'react';

import profilePic from '../../public/assets/images/profile-pic.png'; 

import FollowingComponent from './FollowingComponent';

class ProfilePreviewFollowing extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            following: false,
        };

        this.handleFollowing = this.handleFollowing.bind(this);
        // this.closeComponent = this.closeComponent.bind(this);
    }


    handleFollowing()
    {
        this.setState({following: true});
    }

    
    render()
    {
        const { following } = this.state;

        if(this.state.following)
        {
            return <FollowingComponent/>
        }

        return(
            <div>
                <section>
                    <h2>Following</h2>
                    
                    <button onClick={this.handleFollowing}>See all</button>
                    

                    <div>
                        <div>
                            <div>
                                <img src = {profilePic} alt = 'Profile picture' title = 'Profile picture'/>

                                <h3>Username</h3>
                            </div>

                            <div>
                                <img src = {profilePic} alt = 'Profile picture' title = 'Profile picture'/>

                                <h3>Username</h3>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default ProfilePreviewFollowing;