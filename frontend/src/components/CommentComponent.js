import React from 'react';

import profilePic from '../../public/assets/images/profile-pic.png'

class CommentComponent extends React.Component
{
    render()
    {
        return(
            <div>
                <img src = {profilePic} alt = 'Profile picture' title = 'Profile picture'/>

                <h1>Username</h1>

                <p>comment</p>
            </div>
        );
    }
}

export default CommentComponent;