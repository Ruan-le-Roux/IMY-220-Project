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
            id: this.props.playlistId,
            playlist: '',
            owner: '',
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
            const userId = localStorage.getItem('userId');
            const res = await fetch(`/api/playlists/${this.state.id}`);
            const data = await res.json();
    
            if(res.ok)
            {
                this.setState({playlist: data.data}, () => {
                    this.getOwner();

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
        // console.log("isapidfhjvb: ", playlist);
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

    displayPlaylist()
    {
        const { playlist, owner } = this.state;

        return(

            <main>
                <img src = {albumPic} alt = 'Album cover' title = 'Album cover'/>

                <h1>{playlist.name}</h1>

                <h2>{owner}</h2>
                
                {/* <p>{playlist.songId.length} Songs</p> */}
                <p>{playlist.songId ? `${playlist.songId.length} Songs` : '0 Songs'}</p>


                <p>{playlist.category}</p>

                <p>{playlist.hashTags}</p>

                <p>{playlist.description}</p>

                <button onClick = {this.handleEdit}>Edit</button>
                <button onClick = {this.handleDelete}>Delete</button>
                <button onClick = {this.addSong}><FontAwesomeIcon icon={faPlus} />Add Song</button>

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


    render()
    {
        const { edit, showAddComment } = this.state;

        if(this.state.edit)
        {
            return <EditPlaylist id={this.state.id}/>;
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