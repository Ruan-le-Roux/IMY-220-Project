import React from 'react';
import { Navigate } from 'react-router-dom';


class CreatePlaylist extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            submitted: false,
            userId: localStorage.getItem('userId'),
            name: '',
            category: '',
            description: '',
            coverImage: '',
            hashTags: '',
            created: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    // async componentDidMount()
    // {
    //     const {name, category, description, coverImage, hashTags} = this.state;
    //     try
    //     {
    //         const res = await fetch(`/api/playlists/create-playlist`, {
    //             method: "POST",
    //             headers:
    //             {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(
    //                 {
    //                     name: name,
    //                     category: category,
    //                     description: description,
    //                     coverImage: coverImage,
    //                     hashTags: hashTags,
    //                 }
    //             )
    //         });
    //         const data = await res.json();

    //         if(res.ok)
    //         {
    //             window.alert("Playlist created");
    //             this.setState({created: true});
    //         }
    //         else
    //         {
    //             console.error(data.message);
    //             window.alert("Playlist not created");
    //         }
    //     }
    //     catch(error)
    //     {
    //         console.error("Error when creating playlists: ", error);
    //         window.alert("Playlist not created");
    //     }        
    // }

    async handleSubmit(e)
    {
        e.preventDefault();

        const {name, category, description, coverImage, hashTags} = this.state;

        const formData = new FormData();
        const userId = parseInt(localStorage.getItem('userId'), 10);
        formData.append('userId', userId);
        formData.append('name', name);
        formData.append('category', category);
        formData.append('description', description);
        if (coverImage) 
        {
            formData.append('coverImage', coverImage);
        }
        formData.append('hashTags', JSON.stringify(hashTags)); // Send as JSON

        try
        {
            const res = await fetch(`/api/playlist/create-playlist`, {
                method: "POST",
                body: formData
            });
            const data = await res.json();

            if(res.ok)
            {
                window.alert("Playlist created");
                this.setState({created: true});
                this.props.onClose();
            }
            else
            {
                console.error(data.message);
                window.alert("Playlist not created");
            }
        }
        catch(error)
        {
            console.error("Error when creating playlists: ", error);
            window.alert("Playlist not created");
        }  
    }

    handleChange(e)
    {
        this.setState({[e.target.name]: e.target.value});
    }

    handleFileChange(event)
    {
        const file = event.target.files[0];
        this.setState({ coverImage: file });
    }

    render()
    {
        const {name, category, description, coverImage, hashTags} = this.state;

        if(this.state.submitted)
        {
            return <Navigate to = '/ProfilePage/13'/>
        }
        return(
            <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-center">Create Playlist</h1>
                <form onSubmit={this.handleSubmit} className="space-y-6">
                    <label className="block">
                        <span className="block text-lg font-medium text-gray-700">Name:<span className="text-red-500">*</span></span>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            placeholder="Playlist name"
                            
                            onChange={this.handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>

                    <label className="block">
                        <span className="block text-lg font-medium text-gray-700">Category:<span className="text-red-500">*</span></span>
                        <input
                            type="text"
                            name="category"
                            value={category}
                            placeholder="Category"
                            required
                            onChange={this.handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>

                    <label className="block">
                        <span className="block text-lg font-medium text-gray-700">Short description:<span className="text-red-500">*</span></span>
                        <textarea
                            name="description"
                            value={description}
                            placeholder="Description"
                            onChange={this.handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                    </label>

                    <label className="block">
                        <span className="block text-lg font-medium text-gray-700">Cover Image:<span className="text-red-500">*</span></span>
                        <input
                            type="file"
                            name="coverImage"
                            onChange={this.handleFileChange}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                    </label>

                    <label className="block">
                        <span className="block text-lg font-medium text-gray-700">Hashtags:<span className="text-red-500">*</span></span>
                        <textarea
                            name="hashTags"
                            value={hashTags}
                            placeholder="#example"
                            onChange={this.handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                    </label>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Create Playlist!
                    </button>
                </form>
            </div>
        );
    }
}

export default CreatePlaylist;

