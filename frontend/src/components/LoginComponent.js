import React from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

class LoginComponent extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            submitForm: false,
            errorMessage: '',
            email: '',
            password: '',
        };

        this.submitForm = this.submitForm.bind(this);
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value});
    };

    submitForm = async (e) =>
    {
        e.preventDefault();

        const {email, password} = this.state;

        try
        {
            const res = await fetch("/api/users/login", {
                method: 'POST',
                headers: 
                {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            });

            const data = await res.json();

            if(res.ok)
            {
                localStorage.setItem('userId', data.data.id);
                this.setState({submitForm: true});
            }
            else
            {

                // console.log("error: ", data);
                this.setState({errorMessage: data.message});
            }
        }
        catch(error)
        {
            console.error('Error with login: ', error);
            this.setState({errorMessage: error.message});
        }
    }


    render()
    {
        const {submitForm, errorMessage} = this.state;

        if(submitForm)
        {
            return <Navigate to = '/Home'/>
        }

        return(
            <div className="bg-cWhite p-6 rounded-lg max-w-md mx-auto">
                <form onSubmit={this.submitForm} className="flex flex-col space-y-4">
                    {errorMessage && <div className="text-red-500">{errorMessage}</div>}

                    <label className="flex flex-col">
                        <span className="text-cBlack">Email: <span className="text-red-500">*</span></span>
                        <input
                            type="email"
                            name='email'
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
                            name='password'
                            placeholder="Password1010!"
                            required
                            onChange={this.handleChange}
                            className="p-2 border rounded-lg shadow-lg focus:outline-none focus:ring focus:ring-cPink"
                        />
                    </label>

                    <button
                        type="submit"
                        className="bg-cBlue text-white p-2 rounded hover:bg-cPink transition duration-200"
                    >
                        Login
                    </button>
                </form>
            </div>

        );
    }
}

export default LoginComponent;