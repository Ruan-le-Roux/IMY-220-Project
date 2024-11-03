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

    async deleteSong(songId)
    {
        try
        {
            const userId = localStorage.getItem('userId');
            const res = await fetch(`/api/playlists/delete-song/${this.state.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    "songId": songId,
                    "userId": userId
                })
            });
            const data = await res.json();

            if(res.ok)
            {
                this.componentDidMount();
            }
            else
            {
                window.alert("Could not delete song: ", data.message);
                console.error(data.message);
            }
        }
        catch(error)
        {
            console.error("Error when deleing song from playlist: ", error);
            window.alert("Could not delete song");
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
                    <div className="flex space-x-3 mb-6">
                        <button 
                            onClick={this.handleEdit} 
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                        >
                            Edit
                        </button>
                        <button 
                            onClick={this.handleDelete} 
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                        >
                            Delete
                        </button>
                        <button 
                            onClick={this.addSong} 
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200 flex items-center space-x-2"
                        >
                            <FontAwesomeIcon icon={faPlus} />
                            <span>Add Song</span>
                        </button>
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

            <main className="p-6 bg-gray-100 min-h-screen">
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6">
        <img 
            src={playlist.coverImage} 
            alt="Album cover" 
            title="Album cover" 
            className="w-full h-64 object-cover rounded-md mb-4"
        />

        <h1 className="text-3xl font-bold mb-2">{playlist.name}</h1>
        <h2 className="text-lg font-medium text-gray-700 mb-4">{owner}</h2>

        <p className="text-gray-600 mb-2">{playlist.songId ? `${playlist.songId.length} Songs` : '0 Songs'}</p>
        <p className="text-gray-600 mb-2">{playlist.category}</p>
        <p className="text-gray-500 mb-4">{playlist.hashTags}</p>
        <p className="text-gray-700 mb-6">{playlist.description}</p>

        {isOwner && (
            <div className="flex space-x-3 mb-6">
                <button 
                    onClick={this.handleEdit} 
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Edit
                </button>
                <button 
                    onClick={this.handleDelete} 
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Delete
                </button>
                <button 
                    onClick={this.addSong} 
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center space-x-2"
                >
                    <FontAwesomeIcon icon={faPlus} />
                    <span>Add Song</span>
                </button>
            </div>
        )}

        <hr className="border-t-2 border-gray-200 mb-6"/>

        <div className="mb-6">
            <div className="grid grid-cols-4 font-semibold text-gray-800 mb-2">
                <h1 className="col-span-1">#</h1>
                <h1 className="col-span-1">Name</h1>
                <h1 className="col-span-1">Date added</h1>
                <h1 className="col-span-1">Link</h1>
            </div>

            <div>
                <DisplaySongs 
                    id={this.state.id} 
                    isOwner={this.state.isOwner} 
                    onDeleteSong={(songId) => this.deleteSong(songId)} 
                />
            </div>
        </div>

        <div>
            <h1 className="text-2xl font-semibold mb-4">Comments</h1>
            <span 
                onClick={this.handleAddComment} 
                className="cursor-pointer text-blue-500 flex items-center mb-4"
            >
                <FontAwesomeIcon icon={faPlus} className="mr-2"/>
                Add Comment
            </span>

            <div>
                <CommentList id={this.state.id} />
            </div>
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
            return <AddComment id={this.state.id}/>

        }

        if(this.state.addSong)
        {
            return <Navigate to = {`/AddSongPage/${id}/p`}/>
        }

        if(this.state.home)
        {
            return <Navigate to = '/home'/>
        }


        return(
            <div className="p-4 bg-gray-100 min-h-screen">
    <main className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {this.displayPlaylist()}
        
        {/* Uncomment and style the comments section as needed */}
        {/* 
        <div className="mt-8">
            <h1 className="text-2xl font-semibold mb-4">Comments</h1>
            <span onClick={this.handleAddComment} className="cursor-pointer text-blue-500">
                <FontAwesomeIcon icon={faPlus} />
            </span>

            <div className="mt-4">
                <CommentList />
            </div>
        </div> 
        */}
    </main>
</div>

        );
    }
}

export default PlaylistComponent;