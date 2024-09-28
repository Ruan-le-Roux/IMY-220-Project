import React from 'react';
import PlaylistComponent from './PlaylistComponent';

class AddComment extends React.Component
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
    }
    
    render()
    {
        const { submit } = this.state;
        if(this.state.submit)
        {
            return <PlaylistComponent/>
        }


        return(
            <div>
                <form onSubmit = {this.handleSubmit}>
                    <label>
                        Comment<span>*</span>
                        <textarea placeholder = 'Comment....' required></textarea>
                    </label>

                    <button type = 'submit'>Add Comment</button>
                </form>

            </div>
        );
    }
}

export default AddComment;