import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Navigate, Link } from 'react-router-dom';

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
            id: this.props.playlistId,
            playlist: {},
            owner: '',
            isOwner: false,
            home: false,

        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleAddComment = this.handleAddComment.bind(this);
        this.addSong = this.addSong.bind(this);
        // this.getOwner = this.getOwner.bind(this);
    }

    async componentDidMount()
    {
        try
        {
            console.log(`playlist Id: ${this.state.id}`);
            const userId = localStorage.getItem('userId');
            const res = await fetch(`/api/playlists/${this.state.id}`);
            const data = await res.json();
    
            if(res.ok)
            {
                // this.setState({playlist: data.data});
                this.setState({playlist: data.data}, () => {
                    this.getOwner();
                    this.checkOwner(userId);
                    
                });
            }
            else
            {
                console.error(data.error);
            }
        }
        catch(error)
        {
            console.error('Error when making api call to get playlist', error);
        }
    }

    
    async getOwner()
    {
        const {playlist} = this.state;
        console.log("isapidfhjvb: ", playlist);
        try
        {
            const res = await fetch(`/api/users/${playlist.userId}`);
            const data = await res.json();

            // console.log("get owner: ", data.data);
    
            if(res.ok)
            {
                this.setState({owner: data.data.name});
            }
            else
            {
                console.error(data.error);
            }
        }
        catch(error)
        {
            console.error('Error when making api call to get user', error);
        }

    }

    async checkOwner(userId)
    {
        console.log(`userId: ${userId} playlist: ${this.state.id}`);
        try
        {
            console.log(`userId: ${userId} playlist: ${this.state.id}`);
            const res = await fetch(`/api/playlists/is-owner/${this.state.id}/${userId}`);
            const data = await res.json();
    
            console.log(`userId: ${userId} playlist: ${this.state.playlist.userId}`);
    
            if(res.ok)
            {
                this.setState({isOwner: true});
            }
            else
            {
                console.error(data.message);
            }
        }
        catch(error)
        {
            console.error("Error when checking is user is owner: ", error);
        }
    }

    handleDelete()
    {
        this.setState({delete: true});
        this.deletePlaylist();
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

    async displayEditing()
    {
        try
        {
            const userId = localStorage.getItem('userId');
            const {playlist} = this.state;
    
            const res = await fetch(`/api/playlists/is-owner/${this.state.id}/${userId}`);
            const data = await res.json();
    
            console.log(`userId: ${userId} playlist: ${playlist.userId}`);
    
            if(res.ok)
            {
                return(
                    <div>
                        <button onClick = {this.handleEdit}>Edit</button>
                        <button onClick = {this.handleDelete}>Delete</button>
                        <button onClick = {this.addSong}><FontAwesomeIcon icon={faPlus} />Add Song</button>
                    </div>
        
                );
            }
            else
            {
                console.error(data.message);
            }
        }
        catch(error)
        {
            console.error("Error when checking is user is owner: ", error);
        }
    }

    displayPlaylist()
    {
        const { playlist, owner, isOwner } = this.state;

        return(

            <main>
                <img src = {playlist.coverImage} alt = 'Album cover' title = 'Album cover'/>

                <h1>{playlist.name}</h1>

                <h2>{owner}</h2>
                
                {/* <p>{playlist.songId.length} Songs</p> */}
                <p>{playlist.songId ? `${playlist.songId.length} Songs` : '0 Songs'}</p>


                <p>{playlist.category}</p>

                <p>{playlist.hashTags}</p>

                <p>{playlist.description}</p>

                {isOwner && (
                    <div>
                        <button onClick={this.handleEdit}>Edit</button>
                        <button onClick={this.handleDelete}>Delete</button>
                        <button onClick={this.addSong}>
                        <FontAwesomeIcon icon={faPlus} /> Add Song
                        </button>
                    </div>
                )}

                <hr/>

                <div>
                    <div>
                        <h1>#</h1>

                        <h1>Name</h1>

                        <h1>Date added</h1>

                        <h1>Link</h1>
                    </div>

                    <div>
                        <DisplaySongs id={this.state.id}/>
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
        );
    }

    async deletePlaylist()
    {
        try
        {
            const userId = parseInt(localStorage.getItem('userId'));
            const res = await fetch(`/api/playlists/delete-playlist/${this.state.id}/${userId}`, {
                method: 'DELETE'
            });
            const data = await res.json();

            if(res.ok)
            {
                window.alert("Playlists deleted");
                this.setState({home: true});
                
            }
            else if(res.status === 401)
            {
                window.alert("Only a owner can delete a playlist");
            }
            else
            {
                window.alert("Playlist could not be deleted");
                console.error(data.message);
            }
        }
        catch(error)
        {
            console.error("Error when deleting playlist: ", error);
            window.alert("Playlist could not be deleted");
        }
    }


    render()
    {
        const { edit, showAddComment, id } = this.state;

        if(this.state.edit)
        {
            return <EditPlaylist id={this.state.id}/>;
        }

        if(this.state.showAddComment)
        {
            return <AddComment/>

        }

        if(this.state.addSong)
        {
            return <Navigate to = {`/AddSongPage/${id}`}/>
        }

        if(this.state.home)
        {
            return <Navigate to = '/home'/>
        }


        return(
            <div>
                
                <main>

                    {this.displayPlaylist()}
{/*                     
                    <div>
                        <h1>Comments</h1>

                        <span onClick = {this.handleAddComment}><FontAwesomeIcon icon={faPlus} /></span>

                        

                        <div>
                            <CommentList/>
                        </div>
                    </div> */}
                </main>
            </div>
        );
    }
}

export default PlaylistComponent;