import React from 'react';
import PlaylistComponent from './PlaylistComponent';

class EditPlaylist extends React.Component
{
    constructor(props)
    {
        super(props);
        
        this.state = {
            submit: false,
        };


        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(e)
    {
        e.preventDefault();

        this.setState({submit: true});

        //fix with router
    }

    render()
    {

        if(this.state.submit)
        {
            return <PlaylistComponent/>;
        }
        return(
            <div>
                <h1>Edit Playlist</h1>
                <form onSubmit = {this.handleSubmit}>
                    <label>
                        Name:

                        <input type = 'text' placeholder = 'playlist name'/>
                    </label>

                    <label>
                        Category:

                        <input type = 'text' placeholder = 'Category'/>
                    </label>

                    <label>
                        Short description:

                        <textarea name = 'description' placeholder = 'Description' ></textarea>
                    </label>

                    <label>
                        Cover Image:

                        <input type = 'file' />
                    </label>

                    <label>
                        Hashtags:

                        <textarea name = 'hashtags' placeholder = '#example'></textarea>
                    </label>

                    <button type = 'submit'>Make changes</button>
                </form>

            </div>
        );
    }
}

export default EditPlaylist;