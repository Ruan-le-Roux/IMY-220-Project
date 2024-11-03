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
            coverImage: null,
            hashTags: '',
        };


        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    handleChange(event)
    {
        const { name, value } = event.target;
        this.setState({ [name]: value });

    }

    handleFileChange(event)
    {
        const file = event.target.files[0];
        this.setState({ coverImage: file });
    }

    


    async handleSubmit(e)
    {
        e.preventDefault();
        const { id, name, category, description, coverImage, hashTags } = this.state;

        const formData = new FormData();
        const userId = parseInt(localStorage.getItem('userId'), 10);
        formData.append('userId', userId);
        formData.append('name', name);
        formData.append('category', category);
        formData.append('description', description);
        if (coverImage) {
        formData.append('coverImage', coverImage);
        }
        formData.append('hashTags', JSON.stringify(hashTags)); // Send as JSON

        try
        {
            const userId = parseInt(localStorage.getItem('userId'), 10);
            const res = await fetch(`/api/playlists/update-playlist/${id}`, {
                method: 'PUT',
                // headers:
                // {
                //     'Content-Type': 'application/json'
                // },
                body: formData 
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

        const { name, category, description, hashTags, submit } = this.state;


        if(this.state.submit)
        {
            return <PlaylistComponent playlistId={this.state.id}/>;
        }
        return(
            <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                <h1 className="text-xl font-bold mb-4">Edit Playlist</h1>
                <form onSubmit={this.handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Name:
                            <input 
                                name='name' 
                                type='text' 
                                placeholder='playlist name' 
                                value={name} 
                                onChange={this.handleChange} 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Category:
                            <input 
                                name='category' 
                                type='text' 
                                placeholder='Category' 
                                value={category} 
                                onChange={this.handleChange} 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Short description:
                            <textarea 
                                name='description' 
                                placeholder='Description' 
                                value={description} 
                                onChange={this.handleChange} 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Cover Image:
                            <input 
                                name='coverImage' 
                                type='file' 
                                onChange={this.handleFileChange} 
                                className="mt-1 block w-full text-gray-700 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Hashtags:
                            <textarea 
                                name='hashTags' 
                                placeholder='example' 
                                value={hashTags} 
                                onChange={this.handleChange} 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </label>
                    </div>

                    <button 
                        type='submit' 
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Make changes
                    </button>
                </form>
            </div>
        );
    }
}

export default EditPlaylist;