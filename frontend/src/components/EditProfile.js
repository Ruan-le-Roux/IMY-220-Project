import React from 'react';

import ProfileInfoForm from './ProfileInfoForm';
import RegisterInfoForm from './RegisterInfoForm';


class EditProfile extends React.Component
{
    render()
    {
        const userId = localStorage.getItem('userId');
        return(
            <div>
                <RegisterInfoForm type='p'userId={userId} onUpdate={this.props.onUpdate} onClose={this.props.onClose}/>
            </div>
        );
    }
}

export default EditProfile;