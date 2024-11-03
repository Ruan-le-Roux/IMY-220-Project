import React from 'react';
import { Navigate } from 'react-router-dom';

import playlistPic from '../../public/assets/images/album-cover.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';


class SongFeed extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            type: this.props.type,
            songs: [],
            noSongs: false,
            playlists: [],
            showContextMenu: false,
            showPlaylists: false,
            selectedSong: null,
        };

        this.handleOutSideClick = this.handleOutSideClick.bind(this);
    }

    async componentDidMount()
    {
        await this.fetchSongs();
        await this.fetchPlaylists();

        document.addEventListener('click', this.handleOutSideClick);
    }

    async fetchSongs()
    {
        if(this.state.type === 'home')
        {
            try
            {
                const userId = parseInt(localStorage.getItem('userId'));
                const res = await fetch(`/api/songs/my-songs/${userId}`);
                const data = await res.json();

                if(res.ok)
                {
                    this.setState({songs: data.data});
                }
                else
                {
                    console.error(data.message);
                }    
            }
            catch(error)
            {
                console.error("Error getting all songs: ", error);
            }
        }
        else
        {
            try
            {
                const userId = parseInt(localStorage.getItem('userId'));
                const res = await fetch(`/api/songs`);
                const data = await res.json();

                if(res.ok)
                {
                    this.setState({songs: data.data});
                }
                else
                {
                    console.error(data.message);
                }    
            }
            catch(error)
            {
                console.error("Error getting all songs: ", error);
            }
        }
    }

    async fetchPlaylists()
    {
        try
        {
            const userId = localStorage.getItem('userId');
            const res = await fetch(`/api/playlists/my-playlists/${userId}`);
            const data = await res.json();

            if(res.ok)
            {
                this.setState({playlists: data.data});
            }
            else
            {
                console.error(data.message);
            }
        }
        catch(error)
        {
            console.error("Error getting playlists: ", error)
        }
    }

    componentWillUnmount()
    {
        window.removeEventListener('click', this.handleOutSideClick);
    }

    toggleContextMenu(event, song)
    {
        event.stopPropagation();

        this.setState((prevState) => ({
            showContextMenu: !prevState.showContextMenu,
            selectedSong: song,
            showPlaylists: false
        }));
    }

    handleOutSideClick(event)
    {
        if (this.state.showContextMenu && this.contextMenuRef && !this.contextMenuRef.contains(event.target)) 
        {
            this.setState({ showContextMenu: false, showPlaylists: false });
        }
    }

    async addToPlaylist(playlist)
    {
        const { selectedSong } = this.state;
        console.log(`Adding ${selectedSong.title} to playlist with ID: ${playlist.id}`);

        try
        {
            const userId = parseInt(localStorage.getItem('userId'), 10);
            console.log("before api call: ", "playlistId: ", playlist.id, "songId: ", selectedSong.id, " userId ", userId, "playlist user id", playlist.userId);
            const res = await fetch(`/api/playlists/add-song/${playlist.id}/${userId}`, {
                method: 'PUT',
                headers:
                {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        songId: [selectedSong.id],
                    }
                )
            });
            const message = await res.json();
            
            if(res.ok)
            {
                window.alert(`Song ${selectedSong.title} added to playlist ${playlist.name}`);
                this.setState({showContextMenu: false, showPlaylists: false});
            }
            else
            {
                window.alert(`Could not add song to playlist`);
                console.error(message.message);
            }
        }
        catch(error)
        {
            console.error("Error when adding song to playlist: ", error);
            window.alert(`Could not add song to playlist`);
        }
    }


    display()
    {
        if(this.state.type === 'home')
        {
            return (
                <div className="songs-container">
                <h1 className="text-2xl font-bold mb-4">My Songs</h1>
                {this.displaySongs()}
            </div>
            );
        }
        else
        {
            return (
                <div className="songs-container">
                <h1 className="text-2xl font-bold mb-4">Song Feed</h1>
                {this.displaySongs()}
            </div>
            );
        }

    }

    displaySongs()
    {
        const userId = parseInt(localStorage.getItem('userId'));

        return (
            <div className="grid grid-cols-4 gap-4">
            {this.state.songs.map((song) => (
                <div key={song.id} className="bg-gray-100 rounded-lg p-4 text-center">
                    <div className="flex justify-center">
                        <iframe 
                            src={song.embedUrl} 
                            width="300" 
                            height="380" 
                            frameBorder="0" 
                            allowtransparency="true" 
                            allow="encrypted-media"
                        ></iframe>
                    </div>

                    <h2 className="mt-2 text-lg font-semibold">{song.title}</h2>
                    <p className="text-gray-600">{song.artist}</p>

                    <FontAwesomeIcon 
                        icon={faEllipsis} 
                        onClick={(e) => this.toggleContextMenu(e, song)} 
                        className="mt-2 cursor-pointer" 
                    />

                    {this.state.showContextMenu && this.state.selectedSong === song && (
                        <div
                            className="context-menu absolute bg-white border border-gray-300 p-2 z-10" 
                            ref={(node) => { this.contextMenuRef = node; }}
                        >
                            <h4 className="font-semibold">Select Playlist:</h4>
                            {this.props.ownerId === userId && (
                                <p onClick={() => this.deleteSong(song.id)} className="cursor-pointer hover:text-red-500">
                                    Delete Song
                                </p>
                            )}

                            <p onClick={() => this.setState({ showPlaylists: !this.state.showPlaylists })} className="cursor-pointer hover:text-blue-500">
                                Add Song to Playlist
                            </p>

                            {this.state.showPlaylists && this.state.playlists.length > 0 && (
                                <div className="playlist-list mt-2">
                                    <h4 className="font-semibold">Select Playlist:</h4>
                                    {this.state.playlists.map(playlist => (
                                        <p key={playlist.id} onClick={() => this.addToPlaylist(playlist)} className="cursor-pointer hover:text-blue-500">
                                            {playlist.name}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
        );
    
    }

    

    render()
    {
        return(
            <div className="p-4"> 
                {this.display()}    
            </div>
        );
    }
}

export default SongFeed;