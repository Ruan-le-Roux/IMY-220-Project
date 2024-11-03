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

    handleImage = (event) => 
    {
        const file = event.target.files[0];
        this.setState({ profilePic: file });
    }

    submitForm = async (e) => 
    {
        e.preventDefault();
        // this.setState({isSubmitted: true});

        const 
        {
            profilePic,
            bio,
            instagram,
            facebook,
            tiktok,
            twitter,
        } = this.state;

        const formData = new FormData();
        const userId = parseInt(localStorage.getItem('userId'), 10);
        if (profilePic) 
        {
            formData.append('profilePicture', profilePic);
        }
        formData.append('bio', bio);
        formData.append('instagram', instagram);
        formData.append('facebook', facebook);
        formData.append('tiktok', tiktok);
        formData.append('twitter', twitter);

        try
        {
            const userId = localStorage.getItem('userId');
            const res = await fetch(`/api/users/update-user/${userId}`, {
                method: 'PUT',
                body: formData
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
            <div className="max-w-md mx-auto p-6 bg-cWhite rounded-lg shadow-lg">
                <form onSubmit={this.submitForm} className="flex flex-col space-y-4">
                    {errorMessage && (
                        <div className="text-red-500 mb-4">{errorMessage}</div>
                    )}

                    <label className="flex flex-col">
                        <span className="text-cBlack">Profile Picture:</span>
                        <input
                            type="file"
                            name="profilePic"
                            onChange={this.handleImage}
                            className="mt-1 border rounded-md p-2  focus:outline-none focus:ring focus:ring-cPink"
                        />
                    </label>

                    <label className="flex flex-col">
                        <span className="text-cBlack">Bio: <span className="text-red-500">*</span></span>
                        <textarea
                            rows="4"
                            cols="50"
                            name="bio"
                            placeholder="Short bio about myself"
                            onChange={this.handleChange}
                            className="mt-1 border rounded-md p-2  focus:outline-none focus:ring focus:ring-cPink"
                        ></textarea>
                    </label>

                    <p className="text-cBlack font-semibold">Other social accounts:</p>

                    {/* Instagram */}
                    <label className="flex items-center space-x-2">
                        <img src={instagram} alt="Instagram logo" title="Instagram logo" className="h-6 w-6" />
                        <input
                            type="text"
                            name="instagram"
                            onChange={this.handleChange}
                            placeholder="link to your Instagram account"
                            className="border rounded-md p-2  focus:outline-none focus:ring focus:ring-cPink flex-1"
                        />
                    </label>

                    {/* Facebook */}
                    <label className="flex items-center space-x-2">
                        <img src={facebook} alt="Facebook logo" title="Facebook logo" className="h-6 w-6" />
                        <input
                            type="text"
                            name="facebook"
                            onChange={this.handleChange}
                            placeholder="link to your Facebook account"
                            className="border rounded-md p-2  focus:outline-none focus:ring focus:ring-cPink flex-1"
                        />
                    </label>

                    {/* TikTok */}
                    <label className="flex items-center space-x-2">
                        <img src={tiktok} alt="TikTok logo" title="TikTok logo" className="h-6 w-6" />
                        <input
                            type="text"
                            name="tiktok"
                            onChange={this.handleChange}
                            placeholder="link to your TikTok account"
                            className="border rounded-md p-2  focus:outline-none focus:ring focus:ring-cPink flex-1"
                        />
                    </label>

                    {/* Twitter */}
                    <label className="flex items-center space-x-2">
                        <img src={twitter} alt="Twitter logo" title="Twitter logo" className="h-6 w-6" />
                        <input
                            type="text"
                            name="twitter"
                            onChange={this.handleChange}
                            placeholder="link to your Twitter account"
                            className="border rounded-md p-2  focus:outline-none focus:ring focus:ring-cPink flex-1"
                        />
                    </label>

                    <button type="submit" className="mt-4 text-white bg-cBlue  py-2 rounded-md hover:bg-cPink transition duration-200">
                        Create account!
                    </button>
                </form>
            </div>
        );
    }
}

export default ProfileInfoForm;
// export default ProfileInfoForm;