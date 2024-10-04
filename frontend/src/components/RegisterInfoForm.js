import React from 'react';

import ProfileInfoForm from './ProfileInfoForm'; 

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
            errorMessage: '',
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value});
    };

    submitForm = async (e) => {
        e.preventDefault();
        // this.setState({submitted: true});

        const { name, surname, email, password } = this.state;

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
            }
            else
            {
                this.setState({ errorMessage: data.message || 'Registration Failed'});
            }
        }
        catch(error)
        {
            console.error('Error registering: ', error);
            this.setState({ errorMessage: data.message || 'Registration failed'});
        }
    };

    render()
    {
        const {submitted, errorMessage } = this.state;

        if(submitted)
        {
            return(
                // <RegisterInfoForm userData = {this.state}/>
                <ProfileInfoForm />
            );
        }

        return(
            <form onSubmit = {this.submitForm}>

                {errorMessage && <div style = {{color: 'red'}}>{errorMessage}</div>}

                <label>
                    Name: <span>*</span>
                    <input type = "text" name = 'name' placeholder = "name" required onChange = {this.handleChange}/>
                </label>

                <label>
                    Surname: <span>*</span>
                    <input type = "text" name = 'surname' placeholder = "surname" required onChange = {this.handleChange}/>
                </label>

                <label>
                    Email: <span>*</span>
                    <input type = "email" name = 'email' placeholder = "example@emai.com" required onChange = {this.handleChange}/>
                </label>

                <label>
                    Password: <span>*</span>
                    <input type = "text" name = 'password' placeholder = "Password1010!" required onChange = {this.handleChange}/>
                </label>

                <button type = "submit">Set up profile!</button>
            </form>
        );
    }

}

export default RegisterInfoForm;