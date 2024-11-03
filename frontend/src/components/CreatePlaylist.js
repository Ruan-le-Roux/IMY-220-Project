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
            <div>
                <h1>create Playlist</h1>
                <form onSubmit = {this.handleSubmit}>
                    <label>
                        Name:<span>*</span>

                        <input type = 'text' name='name' value={name} placeholder = 'playlist name' required onChange={this.handleChange}/>
                    </label>

                    <label>
                        Category:<span>*</span>

                        <input type = 'text' name='category' value={category} placeholder = 'Category' required onChange={this.handleChange}/>
                    </label>

                    <label>
                        Short description:<span>*</span>

                        <textarea name = 'description' value={description} placeholder = 'Description' onChange={this.handleChange}></textarea>
                    </label>

                    <label>
                        Cover Image:<span>*</span>

                        <input type = 'file' name='coverImage'  onChange={this.handleFileChange}/>
                    </label>

                    <label>
                        Hashtags:<span>*</span>

                        <textarea name = 'hashTags' value={hashTags} placeholder = '#example'  onChange={this.handleChange}></textarea>
                    </label>

                    <button type = 'submit'>Create Playlist!</button>
                </form>
            </div>
        );
    }
}

export default CreatePlaylist;

