import React from 'react';

import FollowerComponent from './FollowerComponent';
import FollowingComponent from './FollowingComponent';

import ProfilePreviewFollowing from './ProfilePreviewFollowing';
import ProfilePreviewFollowers from './ProfilePreviewFollowers';

import profilePic from '../../public/assets/images/profile-pic.png';

class ProfilePreview extends React.Component
{
    // constructor(props)
    // {
    //     super(props);

    //     this.state = {
    //         followers: false,
    //         following: false,
    //     };

    //     this.handleFollowers = this.handleFollowers.bind(this);
    //     this.handleFollowing = this.handleFollowing.bind(this);
    //     this.closeComponent = this.closeComponent.bind(this);
    // }

    // handleFollowers()
    // {
    //     this.setState({followers: true, following: false});
    // }

    // handleFollowing()
    // {
    //     this.setState({following: true, followers: false});

    //     // <FollowingComponent/>
    // }

    // closeComponent()
    // {
    //     this.setState({followers: false, following: false});
    // }

    render()
    {
        // const { followers, following } = this.state;
        // return(
        //     <div>

        //     </div>
        // );

        // if(!this.state.following)
        // {
            
        //     <ProfilePreviewFollowing/>
        // }
        // else
        // {
        //     <FollowingComponent/>
        // }

        // if(!this.state.followers)
        // {
        //     <ProfilePreviewFollowers/>
        // }
        // else
        // {
        //     <FollowerComponent/>
        // }

        return(
            <div>
                <ProfilePreviewFollowing/>
    
    
                <ProfilePreviewFollowers/>
            </div>
        );
    }
}

export default ProfilePreview;