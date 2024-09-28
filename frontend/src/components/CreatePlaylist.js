import React from 'react';
import { Navigate } from 'react-router-dom';


class CreatePlaylist extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            submitted: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e)
    {
        e.preventDefault();

        this.setState({submitted: true});
    }

    render()
    {
        if(this.state.submitted)
        {
            return <Navigate to = '/ProfilePage/13'/>
        }
        return(
            <div>
                <h1>create Playlist</h1>
                <form onSubmit = {this.handleSubmit}>
                    <label>
                        Name:<span>*</span>

                        <input type = 'text' placeholder = 'playlist name' required/>
                    </label>

                    <label>
                        Category:<span>*</span>

                        <input type = 'text' placeholder = 'Category' required/>
                    </label>

                    <label>
                        Short description:<span>*</span>

                        <textarea name = 'description' placeholder = 'Description' required></textarea>
                    </label>

                    <label>
                        Cover Image:<span>*</span>

                        <input type = 'file' required/>
                    </label>

                    <label>
                        Hashtags:<span>*</span>

                        <textarea name = 'hashtags' placeholder = '#example' required></textarea>
                    </label>

                    <button type = 'submit'>Create Playlist!</button>
                </form>
            </div>
        );
    }
}

export default CreatePlaylist;

