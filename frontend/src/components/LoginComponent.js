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
            <div>
                <form onSubmit = {this.submitForm}>
                    {errorMessage && <div style = {{color: 'red'}}>{errorMessage}</div>}

                    <label>
                        Email: <span>*</span>
                        <input type = "email" name = 'email' placeholder = "example@emai.com" required onChange = {this.handleChange}/>
                    </label>

                    <label>
                        Password: <span>*</span>
                        <input type = "password" name = 'password' placeholder = "Password1010!" required onChange = {this.handleChange}/>
                    </label>
                    <button type = "submit">Login</button>
                </form>


                <p><small>Don't have an account? <Link to = '/RegisterPage'>Register here</Link></small></p>
            </div>

        );
    }
}

export default LoginComponent;