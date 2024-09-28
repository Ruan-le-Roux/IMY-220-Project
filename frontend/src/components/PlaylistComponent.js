import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Navigate } from 'react-router-dom';

import Nav from './Nav';
import DisplaySongs from './DisplaySongs';
import CommentList from './CommentList';

import albumPic from '../../public/assets/images/album-cover.png';
import EditPlaylist from './EditPlaylist';
import AddComment from './AddComment';

class PlaylistComponent extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            edit: false,
            delete: false,
            showAddComment: false,
            addSong: false,
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleAddComment = this.handleAddComment.bind(this);
        this.addSong = this.addSong.bind(this);
    }

    handleDelete()
    {
        this.setState({delete: true});
    }

    handleEdit()
    {
        this.setState({edit: true});
    }

    handleAddComment()
    {
        this.setState({showAddComment: true});
        // <AddComment/>
    }

    addSong()
    {
        this.setState({addSong: true});
    }


    render()
    {
        const { edit, showAddComment } = this.state;

        if(this.state.edit)
        {
            return <EditPlaylist/>;
        }

        if(this.state.delete)
        {

        }

        if(this.state.showAddComment)
        {
            return <AddComment/>

        }

        if(this.state.addSong)
        {
            return <Navigate to = '/AddSongPage'/>
        }


        return(
            <div>
                {/* <Nav/> */}

                <main>
                    <img src = {albumPic} alt = 'Album cover' title = 'Album cover'/>

                    <h1>Playlist name</h1>

                    <h2>Owner</h2>
                    
                    <p>Amount of songs</p>

                    <p>Category</p>

                    <p>Hashtags</p>

                    <p>Description</p>

                    <button onClick = {this.handleEdit}>Edit</button>
                    <button onClick = {this.handleDelete}>Delete</button>
                    <button onClick = {this.addSong}><FontAwesomeIcon icon={faPlus} />Add Song</button>

                    <div>
                        <div>
                            <h1>#</h1>

                            <h1>Name</h1>

                            <h1>Date added</h1>

                            <h1>Link</h1>
                        </div>

                        <div>
                            <DisplaySongs/>
                        </div>
                    </div>

                    <div>
                        <h1>Comments</h1>

                        <span onClick = {this.handleAddComment}><FontAwesomeIcon icon={faPlus} /></span>

                        

                        <div>
                            <CommentList/>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default PlaylistComponent;