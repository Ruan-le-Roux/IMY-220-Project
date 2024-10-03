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
        this.setState({ [r.target.name]: e.target.value});
    };

    submitForm = async (e) => {
        e.preventDefault();
        this.setState({submitted: true});

        

    };

    render()
    {

        if(this.state.submitted)
        {
            return(
                // <RegisterInfoForm userData = {this.state}/>
                <ProfileInfoForm/>
            );
        }

        return(
            <form onSubmit = {this.submitForm}>

                <label>
                    Name: <span>*</span>
                    <input type = "text" placeholder = "name" required/>
                </label>

                <label>
                    Surname: <span>*</span>
                    <input type = "text" placeholder = "surname" required/>
                </label>

                <label>
                    Email: <span>*</span>
                    <input type = "email" placeholder = "example@emai.com" required/>
                </label>

                <label>
                    Password: <span>*</span>
                    <input type = "text" placeholder = "Password1010!" required/>
                </label>

                <button type = "password">Set up profile!</button>
            </form>
        );
    }

}

export default RegisterInfoForm;