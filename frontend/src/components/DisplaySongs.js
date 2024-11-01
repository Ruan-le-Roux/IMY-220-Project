import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

import albumPic from '../../public/assets/images/album-cover.png';


class DisplaySongs extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            noSongs: false,
            songs: [],
            id: this.props.id,
            playlists: [],
            showContextMenu: false,
            selectedSong: null,
        };

        this.displaySongs = this.displaySongs.bind(this);
        this.handleOutSideClick = this.handleOutSideClick.bind(this);
    }

    async componentDidMount()
    {
        const {id} = this.state;

        try
        {
            const res = await fetch(`/api/playlists/get-songs/${id}`);
            const data = await res.json();

            console.log("data: ", data.data);
    
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
            console.error('Error when getting all songs in playlist: ', error);
            this.setState({noSongs: true});
        }

        await this.fetchPlaylists();

        document.addEventListener('click', this.handleOutSideClick);
    }

    componentWillUnmount()
    {
        window.removeEventListener('click', this.handleOutSideClick);
    }

    async fetchPlaylists()
    {
        try
        {
            const userId = localStorage.getItem('userId');
            const res = await fetch(`/api/playlists/my-playlists/${userId}`);
            const data = await res.json();
            console.log("My playlists: ", data.data);
    
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
            console.error('Error fetching users playlists: ', error);
        }
    }

    toggleContextMenu(event, song)
    {
        event.stopPropagation();

        this.setState((prevState) => ({
            showContextMenu: !prevState.showContextMenu,
            selectedSong: song,
        }));
    }

    handleOutSideClick(event)
    {
        if (this.state.showContextMenu && this.contextMenuRef && !this.contextMenuRef.contains(event.target)) 
        {
            this.setState({ showContextMenu: false });
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
            const res = await fetch(`/api/playlists/add-song/${playlist.id}`, {
                method: 'PUT',
                headers:
                {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        "songId": selectedSong.id,
                        "userId": userId
                    }
                )
            });
            const message = await res.json();
            
            if(res.ok)
            {
                window.alert(`Song ${selectedSong.title} added to playlist ${playlist.name}`);
                this.setState({showContextMenu: false});
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

    async deleteSong(songId)
    {
        try
        {
            const userId = parseInt(localStorage.getItem('userId'), 10);
            const res = await fetch(`/api/playlists/delete-song/${songId}`, {
                method: 'PUT',
                headers:
                {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        "songId": songId,
                        "userId": userId
                    }
                )
            });
            const message = await res.json();
    
            if(res.ok)
            {
                window.alert("Song deleted from playlist");
                this.setState({showContextMenu: false});
            }
            else
            {
                window.alert(`Could not delete song from playlist`);
                console.error(message.message);
            }
        }
        catch(error)
        {
            console.error("Error when deleting song from playlist: ", error);
            window.alert(`Could not delete song from playlist`);
        }
    }

    displaySongs()
    {
        const {songs} = this.state;
        const userId = localStorage.getItem('userId');

        return songs.map((song, i) => {

            return(
                <div key={song.id}>
                    <p>{i + 1}</p>

                    <img src = {albumPic} alt = 'Album cover' title = 'Album cover'/>                    

                    <h2>{song.title}</h2>

                    <p>{song.artist}</p>

                    <p>{song.timestamp}</p>

                    <iframe src={song.embedUrl} width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>

                    <FontAwesomeIcon icon = {faEllipsis} onClick={(e) => this.toggleContextMenu(e, song)}/>

                    {this.state.showContextMenu && this.state.selectedSong === song && (
                        <div
                            className="context-menu"
                            ref={(node) => { this.contextMenuRef = node; }}
                            style={{ position: 'absolute', background: 'white', border: '1px solid #ccc', padding: '10px' }}
                        >
                            <h4>Select Playlist:</h4>
                            {this.props.ownerId === userId && (
                                <p onClick={() => this.deleteSong(song.id)} style={{ cursor: 'pointer' }}>
                                    Delete Song
                                </p>
                            )}

                            <p onClick={() => this.setState({ showPlaylists: !this.state.showPlaylists })} style={{ cursor: 'pointer' }}>
                                Add Song to Playlist
                            </p>

                            {this.state.showPlaylists && this.state.playlists.length > 0 && (
                                <div className="playlist-list">
                                    <h4>Select Playlist:</h4>
                                    {this.state.playlists.map(playlist => (
                                        <p key={playlist.id} onClick={() => this.addToPlaylist(playlist)} style={{ cursor: 'pointer' }}>
                                            {playlist.name}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

            );


        })

        


    }


    render()
    {
        if(this.state.noSongs === true)
        {
            return <h1>No songs in this playlist</h1>;
        }

        return(
            <div>
                {this.displaySongs()}
            </div>
        );
    }
}

export default DisplaySongs;

