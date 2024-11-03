import React from 'react';
import PlaylistComponent from './PlaylistComponent';

class AddComment extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            submit: false,
            id: this.props.id,
            text: '',
            image: null,
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
        this.setState({ image: file });
    }

    async handleSubmit(e)
    {
        e.preventDefault();

        const {text, image} = this.state;

        if(!text && !image)
        {
            console.error("Nothing was entered");
            return;
        }

        const formData = new FormData();
        const userId = parseInt(localStorage.getItem('userId'), 10);
        formData.append('text', text);
        if (image) 
        {
            formData.append('image', image);
        }

        try
        {
            const userId = localStorage.getItem('userId');
            const res = await fetch(`/api/playlists/add-comment/${this.state.id}/${userId}`, {
                method: 'PUT',
                body: formData
            });
            const data = await res.json();

            if(res.ok)
            {
                window.alert('Comment added');
                this.setState({submit: true});
            }
            else
            {
                console.error(data.message);
                window.alert('Comment not added');                
            }
        }
        catch(error)
        {
            console.error("Error when adding a comment: ", error);
            window.alert('Comment not added');
        }
    }
    
    render()
    {
        const { submit, text } = this.state;
        if(this.state.submit)
        {
            return <PlaylistComponent playlistId={this.state.id}/>
        }


        return(
            <div>
                <form onSubmit = {this.handleSubmit}>
                    <label>
                        Comment
                        <textarea name='text' placeholder = 'Comment....' onChange={this.handleChange} value={text}></textarea>
                    </label>

                    <label>
                        Add image
                        <input type='file' name='image' onChange={this.handleFileChange}/>
                    </label>

                    <button type = 'submit'>Add Comment</button>
                </form>

            </div>
        );
    }
}

export default AddComment;