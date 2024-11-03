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
                <div className="bg-cWhite p-6 rounded-lg max-w-md mx-auto">
                    <form onSubmit={this.submitForm} className="flex flex-col space-y-4">
                        {errorMessage && <div className="text-red-500">{errorMessage}</div>}

                        <label className="flex flex-col">
                            <span className="text-cBlack">Name: <span className="text-red-500">*</span></span>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                placeholder="name"
                                required
                                onChange={this.handleChange}
                                className="p-2 border rounded-lg shadow-md focus:outline-none focus:ring focus:ring-cPink"
                            />
                        </label>

                        <label className="flex flex-col">
                            <span className="text-cBlack">Surname: <span className="text-red-500">*</span></span>
                            <input
                                type="text"
                                name="surname"
                                value={surname}
                                placeholder="surname"
                                required
                                onChange={this.handleChange}
                                className="p-2 border rounded-lg shadow-md focus:outline-none focus:ring focus:ring-cPink"
                            />
                        </label>

                        <label className="flex flex-col">
                            <span className="text-cBlack">Email: <span className="text-red-500">*</span></span>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                placeholder="example@email.com"
                                required
                                onChange={this.handleChange}
                                className="p-2 border rounded-lg shadow-md focus:outline-none focus:ring focus:ring-cPink"
                            />
                        </label>

                        <label className="flex flex-col">
                            <span className="text-cBlack">Password: <span className="text-red-500">*</span></span>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Password1010!"
                                required
                                onChange={this.handleChange}
                                className="p-2 border rounded-lg shadow-md focus:outline-none focus:ring focus:ring-cPink"
                            />
                        </label>

                        <label className="flex flex-col">
                            <span className="text-cBlack">Profile Picture:</span>
                            <input
                                type="file"
                                name="profilePic"
                                onChange={this.handleImage}
                                className="mt-1"
                            />
                        </label>

                        <label className="flex flex-col">
                            <span className="text-cBlack">Bio: <span className="text-red-500">*</span></span>
                            <textarea
                                rows="4"
                                name="bio"
                                value={bio}
                                placeholder="Short bio about myself"
                                onChange={this.handleChange}
                                className="p-2 border rounded-lg shadow-md focus:outline-none focus:ring focus:ring-cPink"
                            ></textarea>
                        </label>

                        <p className="font-semibold">Other social accounts:</p>

                        <label className="flex items-center">
                            <img src={Instagram} alt="Instagram logo" title="Instagram logo" className="w-6 h-6 mr-2" />
                            <input
                                type="text"
                                name="instagram"
                                value={instagram}
                                onChange={this.handleChange}
                                placeholder="link to your Instagram account"
                                className="p-2 border rounded-lg shadow-md focus:outline-none focus:ring focus:ring-cPink flex-1"
                            />
                        </label>

                        <label className="flex items-center">
                            <img src={Facebook} alt="Facebook logo" title="Facebook logo" className="w-6 h-6 mr-2" />
                            <input
                                type="text"
                                name="facebook"
                                value={facebook}
                                onChange={this.handleChange}
                                placeholder="link to your Facebook account"
                                className="p-2 border rounded-lg shadow-md focus:outline-none focus:ring focus:ring-cPink flex-1"
                            />
                        </label>

                        <label className="flex items-center">
                            <img src={Tiktok} alt="TikTok logo" title="TikTok logo" className="w-6 h-6 mr-2" />
                            <input
                                type="text"
                                name="tiktok"
                                value={tiktok}
                                onChange={this.handleChange}
                                placeholder="link to your TikTok account"
                                className="p-2 border rounded-lg shadow-md focus:outline-none focus:ring focus:ring-cPink flex-1"
                            />
                        </label>

                        <label className="flex items-center">
                            <img src={Twitter} alt="Twitter logo" title="Twitter logo" className="w-6 h-6 mr-2" />
                            <input
                                type="text"
                                name="twitter"
                                value={twitter}
                                onChange={this.handleChange}
                                placeholder="link to your Twitter account"
                                className="p-2 border rounded-lg shadow-md focus:outline-none focus:ring focus:ring-cPink flex-1"
                            />
                        </label>

                        <button
                            type="submit"
                            className="bg-cBlue text-white p-2 rounded-lg hover:bg-cPink transition duration-200"
                        >
                            Set up profile!
                        </button>
                    </form>
                </div>
            );
        }
        else
        {
            return(
                <form onSubmit={this.submitForm} className="max-w-md mx-auto p-6 rounded-lg bg-cWhite">
                    {errorMessage && (
                        <div className="text-red-500 mb-4">{errorMessage}</div>
                    )}

                    <label className="block mb-4">
                        <span className="text-cBlack">Name: <span className="text-red-500">*</span></span>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            placeholder="Enter your name"
                            required
                            onChange={this.handleChange}
                            className="w-full p-2 border  rounded-md mt-1 focus:outline-none focus:ring focus:ring-cPink"
                        />
                    </label>

                    <label className="block mb-4">
                        <span className="text-cBlack">Surname: <span className="text-red-500">*</span></span>
                        <input
                            type="text"
                            name="surname"
                            value={surname}
                            placeholder="Enter your surname"
                            required
                            onChange={this.handleChange}
                            className="w-full p-2 border rounded-md mt-1 focus:outline-none focus:ring focus:ring-cPink"
                        />
                    </label>

                    <label className="block mb-4">
                        <span className="text-cBlack">Email: <span className="text-red-500">*</span></span>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            placeholder="example@email.com"
                            required
                            onChange={this.handleChange}
                            className="w-full p-2 border rounded-md mt-1 focus:outline-none focus:ring focus:ring-cPink"
                        />
                    </label>

                    <label className="block mb-4">
                        <span className="text-cBlack">Password: <span className="text-red-500">*</span></span>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password1010!"
                            required
                            onChange={this.handleChange}
                            className="w-full p-2 border  rounded-md mt-1 focus:outline-none focus:ring focus:ring-cPink"
                        />
                    </label>

                    <button
                        type="submit"
                        className="w-full py-2 bg-cBlue text-white rounded-md hover:bg-cPink transition duration-200 focus:outline-none focus:ring focus:ring-cPink"
                    >
                        Set up profile!
                    </button>
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