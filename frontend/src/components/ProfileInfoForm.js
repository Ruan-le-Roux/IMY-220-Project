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
            isSubmitted: false,
            errorMessage: '',
        };

        this.submitForm = this.submitForm.bind(this);
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    submitForm = async (e) => 
    {
        e.preventDefault();
        // this.setState({isSubmitted: true});

        const 
        {
            profilePicture,
            bio,
            instagram,
            facebook,
            tiktok,
            twitter,
        } = this.state;

        try
        {
            const userId = localStorage.getItem('userId');
            const res = await fetch(`/api/users/update-user/${userId}`, {
                method: 'PUT',
                headers: 
                {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    profilePicture, 
                    bio, instagram, 
                    facebook, 
                    tiktok, 
                    twitter, 
                })
            });

            const data = await res.json();
            if(res.ok)
            {
                this.setState({isSubmitted: true});
            }
            else
            {
                this.setState({errorMessage: data.data.message});
            }
        }
        catch(error)
        {
            console.error('Error registering: ', error);
            this.setState({errorMessage: data.message});
        }        

        // window.location.href = '/Home';

        // this.props.history.push('/Home');
    }


    render()
    {        
        const {isSubmitted, errorMessage } = this.state;

        if(isSubmitted)
        {
            return <Navigate to = '/Home'/>;            
        }
        return(
            <div>
                    <form onSubmit = { this.submitForm }>
                        {errorMessage && <div style = {{color: 'red'}}>{errorMessage}</div>}


                        <label>
                            Profile Picture:

                            <input type = "file" name = 'profilePicture' accept = "image/*" onChange={this.handleChange}/>
                        </label>
                    
                        <label>
                            Bio: <span>*</span>
                            <textarea rows = "4"cols = "50" name = 'bio' placeholder = "Short bio about myself" onChange={this.handleChange}></textarea>
                        </label>

                        <p>Other social accounts:</p> 

                        <label>
                            <img src = {instagram} alt = "Instagram logo" title = "Instagram logo"/>
                            <input type = "text" name = 'instagram' onChange={this.handleChange} placeholder = "link to your Instagram account" />
                        </label>

                        <label>
                            <img src = {facebook} alt = "Facebook logo" title = "Facebook logo"/>
                            <input type = "text" name = 'facebook' onChange={this.handleChange} placeholder = "link to your Facebook account" />
                        </label>

                        <label>
                            <img src = {tiktok} alt = "TikTok logo" title = "TikTok logo"/>
                            <input type = "text" name = 'tiktok' onChange={this.handleChange} placeholder = "link to your TikTok account" />
                        </label>

                        <label>
                            <img src = {twitter} alt = "Twitter logo" title = "Twitter logo"/>
                            <input type = "text" name = 'twitter' onChange={this.handleChange}  placeholder = "link to your Twitter account" />
                        </label>

                        <button type = "submit">Create account!</button>
                </form>
            </div>
        );
    }
}

export default ProfileInfoForm;
// export default ProfileInfoForm;