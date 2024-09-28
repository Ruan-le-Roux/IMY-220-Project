import React from 'react';

import profilePic from '../../public/assets/images/profile-pic.png'; 

import FollowerComponent from './FollowerComponent';

class ProfilePreviewFollowers extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            followers: false,
        };

        this.handleFollowers = this.handleFollowers.bind(this);
        // this.closeComponent = this.closeComponent.bind(this);
    }


    handleFollowers()
    {
        this.setState({followers: true});
    }

    // closeComponent()
    // {
    //     this.setState({followers: false});
    // }

    render()
    {
        const { followers } = this.state;
        
        if(this.state.followers)
        {
            return <FollowerComponent/>
        }
    


        return(
            <div>
                <section>
                    <h2>Followers</h2>
                    {/* {(followers) && (<button onClick = {this.closeComponent}>Close</button>)} */}
                    <button onClick={this.handleFollowers}>See all</button>

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

export default ProfilePreviewFollowers;