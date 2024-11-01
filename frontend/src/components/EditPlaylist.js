import React from 'react';
import PlaylistComponent from './PlaylistComponent';

class EditPlaylist extends React.Component
{
    constructor(props)
    {
        super(props);
        
        this.state = {
            submit: false,
            id: this.props.id,
            name: '',
            category: '',
            description: '',
            coverImage: '',
            hashTags: [],
        };


        this.handleSubmit = this.handleSubmit.bind(this);
    }

    


    async handleSubmit(e)
    {
        e.preventDefault();
        const { id, name, category, description, coverImage, hashTags } = this.state;

        try
        {
            const userId = parseInt(localStorage.getItem('userId'), 10);
            const res = await fetch(`/api/playlists/update-playlist/${id}`, {
                method: 'PUT',
                headers:
                {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "userId": userId,
                    "name": name,
                    "category": category,
                    "description": description,
                    "coverImage": coverImage,
                    "hashTags": hashTags, 
                })
            });
            const message = await res.json();

            if(res.ok)
            {
                window.alert("Playlist updated successfully");
                this.setState({submit: true});
            }
            else
            {
                console.error(message.message);
                window.alert("Could not update playlists");
            }
        }
        catch(error)
        {
            console.error("Error when updating playlist", error);
            window.alert("Could not update playlist");            
        }
    }

    render()
    {

        if(this.state.submit)
        {
            return <PlaylistComponent playlistId={this.state.id}/>;
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