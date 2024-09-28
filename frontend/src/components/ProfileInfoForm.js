import React from 'react';
import { Navigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// import logo from '../public/assets/images/logo.png';
import instagram from '../../public/assets/images/instagram.png';
import facebook from '../../public/assets/images/facebook.png';
import tiktok from '../../public/assets/images/tiktok.png';
import twitter from '../../public/assets/images/twitter.png';


class ProfileInfoForm extends React.Component
{

    constructor(props)
    {
        super(props);

        this.state = {
            profilePic: '',
            bio: '',
            instagram: '',
            facebook: '',
            tiktok: '',
            twitter: '',
            isSubmitted: false
        }

        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(e) 
    {
        e.preventDefault();

        this.setState({isSubmitted: true});

        

        // window.location.href = '/Home';

        // this.props.history.push('/Home');
    }


    render()
    {        
        if(this.state.isSubmitted)
        {
            return <Navigate to = '/Home'/>;            
        }
        return(
            <div>
                    <form onSubmit = { this.submitForm }>

                        <label>
                            Profile Picture:

                            <input type = "file" accept = "image/*"/>
                        </label>
                    
                        <label>
                            Bio: <span>*</span>
                            <textarea rows = "4"cols = "50" placeholder = "Short bio about myself" required></textarea>
                        </label>

                        <p>Other social accounts:</p> 

                        <label>
                            <img src = {instagram} alt = "Instagram logo" title = "Instagram logo"/>
                            <input type = "text" placeholder = "link to your Instagram account" />
                        </label>

                        <label>
                            <img src = {facebook} alt = "Facebook logo" title = "Facebook logo"/>
                            <input type = "text" placeholder = "link to your Facebook account" />
                        </label>

                        <label>
                            <img src = {tiktok} alt = "TikTok logo" title = "TikTok logo"/>
                            <input type = "text" placeholder = "link to your TikTok account" />
                        </label>

                        <label>
                            <img src = {twitter} alt = "Twitter logo" title = "Twitter logo"/>
                            <input type = "text" placeholder = "link to your Twitter account" />
                        </label>

                        <button type = "submit">Create account!</button>
                </form>
            </div>
        );
    }
}

export default ProfileInfoForm;
// export default ProfileInfoForm;