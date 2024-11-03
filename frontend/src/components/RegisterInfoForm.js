import React from 'react';

import ProfileInfoForm from './ProfileInfoForm'; 

import Instagram from '../../public/assets/images/instagram.png';
import Facebook from '../../public/assets/images/facebook.png';
import Tiktok from '../../public/assets/images/tiktok.png';
import Twitter from '../../public/assets/images/twitter.png';
import { faC } from '@fortawesome/free-solid-svg-icons';

class RegisterInfoForm extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            name: '',
            surname: '',
            email: '',
            password: '',
            submitted:  false,
            submitted2:  false,
            errorMessage: '',
            type: this.props.type,
            profilePic: null,
            bio: '',
            instagram: '',
            facebook: '',
            tiktok: '',
            twitter: '',
            userId: this.props.userId || '',
        };

        this.handleImage = this.handleImage.bind(this);
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value});
    };

    handleImage = (event) => 
    {
        const file = event.target.files[0];
        this.setState({ profilePic: file });
    }

    submitForm = async (e) => 
    {
        e.preventDefault();
        // this.setState({submitted: true});

        const { type, name, surname, email, password, profilePic, bio, instagram, facebook, tiktok, twitter, userId } = this.state;

        if(type === 'r')
        {
            if(name === '' && surname === '' && email === '' && password === '')
            {
                return;
            }
            try
            {
                const res = await fetch('/api/users/add-user', {
                    method: 'POST',
                    headers: 
                    {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, surname, email, password })
                });
    
                const data = await res.json();
                
                if(res.ok)
                {
                    // console.log("user:", data.data.id);
                    // console.log("sdlikfhjkgbsdoifhgbsiduhfjgbsoikdufjhgbhsoidfujgbsoidfughsiodfughisgdfurh");
                    localStorage.setItem('userId', data.data.id);
                    this.setState({ submitted: true });
                    // window.alert('Profile updated');
                }
                else
                {
                    this.setState({ errorMessage: data.message || 'Registration Failed'});
                }
            }
            catch(error)
            {
                console.error('Error registering: ', error);
                this.setState({ errorMessage: 'Registration failed'});
            }
        }
        else
        {
            if(name === '' && surname === '' && email === '' && password === '' && bio === '' && instagram === '' && facebook === '' && tiktok === '' && twitter === '' && !profilePic)
            {
                return;
            }

            const formData = new FormData();
            const userId = parseInt(localStorage.getItem('userId'), 10);
            formData.append('name', name);
            formData.append('surname', surname);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('bio', bio);
            formData.append('instagram', instagram);
            formData.append('facebook', facebook);
            formData.append('tiktok', tiktok);
            formData.append('twitter', twitter);
            if (profilePic) 
            {
                formData.append('profilePicture', profilePic);
            }

            try
            {
                const res = await fetch(`/api/users/update-user/${this.state.userId}`, {
                    method: 'PUT',
                    body: formData
                });
    
                const data = await res.json();
                
                if(res.ok)
                {
                    // console.log("user:", data.data.id);
                    // console.log("sdlikfhjkgbsdoifhgbsiduhfjgbsoikdufjhgbhsoidfujgbsoidfughsiodfughisgdfurh");
                    this.setState({ submitted: true });
                    this.props.onUpdate();
                    this.props.onClose();
                }
                else
                {
                    this.setState({ errorMessage: data.message || 'Registration Failed'});
                }
            }
            catch(error)
            {
                console.error('Error registering: ', error);
                this.setState({ errorMessage: 'Registration failed'});
            }

        }

    };

    displayForm()
    {
        const { errorMessage} = this.state;

        const { type, name, surname, email, password, profilePic, bio, instagram, facebook, tiktok, twitter, userId } = this.state;


        if(type === 'p')
        {
            return(
                <form onSubmit = {this.submitForm}>

                    {errorMessage && <div style = {{color: 'red'}}>{errorMessage}</div>}

                    <label>
                        Name: <span>*</span>
                        <input type = "text" name = 'name' value={name} placeholder = "name" onChange = {this.handleChange}/>
                    </label>

                    <label>
                        Surname: <span>*</span>
                        <input type = "text" name = 'surname' value={surname} placeholder = "surname" onChange = {this.handleChange}/>
                    </label>

                    <label>
                        Email: <span>*</span>
                        <input type = "email" name = 'email' value={email} placeholder = "example@emai.com" onChange = {this.handleChange}/>
                    </label>

                    <label>
                        Password: <span>*</span>
                        <input type = "text" name = 'password' value={password} placeholder = "Password1010!" onChange = {this.handleChange}/>
                    </label>

                    <label>
                        Profile Picture:

                        <input type = "file" name = 'profilePic' onChange={this.handleImage}/>
                    </label>
                
                    <label>
                        Bio: <span>*</span>
                        <textarea rows = "4"cols = "50" name = 'bio' value={bio} placeholder = "Short bio about myself" onChange={this.handleChange}></textarea>
                    </label>

                    <p>Other social accounts:</p> 

                    <label>
                        <img src = {Instagram} alt = "Instagram logo" title = "Instagram logo"/>
                        <input type = "text" name = 'instagram' value={instagram}onChange={this.handleChange} placeholder = "link to your Instagram account" />
                    </label>

                    <label>
                        <img src = {Facebook} alt = "Facebook logo" title = "Facebook logo"/>
                        <input type = "text" name = 'facebook' value={facebook}onChange={this.handleChange} placeholder = "link to your Facebook account" />
                    </label>

                    <label>
                        <img src = {Tiktok} alt = "TikTok logo" title = "TikTok logo"/>
                        <input type = "text" name = 'tiktok' value={tiktok}onChange={this.handleChange} placeholder = "link to your TikTok account" />
                    </label>

                    <label>
                        <img src = {Twitter} alt = "Twitter logo" title = "Twitter logo"/>
                        <input type = "text" name = 'twitter' value={twitter} onChange={this.handleChange}  placeholder = "link to your Twitter account" />
                    </label>


                    <button type = "submit">Set up profile!</button>
                </form>
            );
        }
        else
        {
            return(
                <form onSubmit = {this.submitForm}>

                    {errorMessage && <div style = {{color: 'red'}}>{errorMessage}</div>}

                    <label>
                        Name: <span>*</span>
                        <input type = "text" name = 'name' value={name} placeholder = "name" required onChange = {this.handleChange}/>
                    </label>

                    <label>
                        Surname: <span>*</span>
                        <input type = "text" name = 'surname' value={surname} placeholder = "surname" required  onChange = {this.handleChange}/>
                    </label>

                    <label>
                        Email: <span>*</span>
                        <input type = "email" name = 'email' value={email} placeholder = "example@emai.com" required  onChange = {this.handleChange}/>
                    </label>

                    <label>
                        Password: <span>*</span>
                        <input type = "text" name = 'password' value={password} placeholder = "Password1010!" required  onChange = {this.handleChange}/>
                    </label>

                    <button type = "submit">Set up profile!</button>
                </form>
            );

        }
    }

    render()
    {
        const {submitted, errorMessage, type } = this.state;

        if(submitted)
        {
            if(type === 'p')
            {
                return null;
            }
            return(
                // <RegisterInfoForm userData = {this.state}/>
                <ProfileInfoForm />
            );
        }

        return(
            <div>
                {this.displayForm()}            

            </div>
        );
    }

}

export default RegisterInfoForm;