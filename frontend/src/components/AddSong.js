import React from 'react';
import { Navigate } from 'react-router-dom';

class AddSong extends React.Component
{

    constructor(props)
    {
        super(props);

        this.state = {
            addSong: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e)
    {
        e.preventDefault();

        this.setState({addSong: true});
    }



    render()
    {
        if(this.state.addSong)
        {
            return <Navigate to = '/ProfilePage/12'/>;
        }

        return(
            <div>
                <form onSubmit = {this.handleSubmit}>
                    <label>
                        Song name:<span>*</span>

                        <input type = 'text' placeholder = 'Song name' required/>
                    </label>

                    <label>
                        Artist:<span>*</span>

                        <input type = 'text' placeholder = 'Artist Name' required/>
                    </label>

                    <label>
                        Link:<span>*</span>

                        <input type = 'text' placeholder = 'link' required/>
                    </label>

                    <label>
                        Album cover:<span>*</span>

                        <input type = 'file' required/>
                    </label>

                    <button type = 'submit'>Add Song</button>
                </form>
            </div>
        );
    }
}

export default AddSong;