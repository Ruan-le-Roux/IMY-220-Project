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
        };

        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(e)
    {
        e.preventDefault();

        this.setState({submitForm: true});
    }


    render()
    {
        if(this.state.submitForm)
        {
            return <Navigate to = '/Home'/>
        }
        return(
            <div>
                <form onSubmit = {this.submitForm}>
                    <label>
                        Email: <span>*</span>
                        <input type = "email" placeholder = "example@emai.com" required/>
                    </label>

                    <label>
                        Password: <span>*</span>
                        <input type = "password" placeholder = "Password1010!" required/>
                    </label>
                    <button type = "submit">Login</button>
                </form>


                <p><small>Don't have an account? <Link to = '/RegisterPage'>Register here</Link></small></p>
            </div>

        );
    }
}

export default LoginComponent;