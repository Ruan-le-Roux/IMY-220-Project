import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

import albumPic from '../../public/assets/images/album-cover.png';

class DisplaySongs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            noSongs: false,
            songs: [],
            id: this.props.id,
            playlists: [],
            showContextMenu: false,
            selectedSong: null,
            owner: '',
            userId: localStorage.getItem('userId'),
        };

        this.displaySongs = this.displaySongs.bind(this);
        this.handleOutSideClick = this.handleOutSideClick.bind(this);
    }

    async componentDidMount() {
        const { id } = this.state;

        try {
            const res = await fetch(`/api/playlists/get-songs/${id}`);
            const data = await res.json();

            console.log("data: ", data.data);

            if (res.ok) {
                this.setState({ songs: data.data });
            } else {
                console.error(data.message);
                this.setState({ noSongs: true });
            }
        } catch (error) {
            console.error('Error when getting all songs in playlist: ', error);
            this.setState({ noSongs: true });
        }

        await this.fetchPlaylists();

        document.addEventListener('click', this.handleOutSideClick);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.handleOutSideClick);
    }

    async fetchPlaylists() {
        try {
            const userId = localStorage.getItem('userId');
            const res = await fetch(`/api/playlists/my-playlists/${this.state.userId}`);
            const data = await res.json();
            console.log("My playlists: ", data.data);

            if (res.ok) {
                this.setState({ playlists: data.data });
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error fetching users playlists: ', error);
        }
    }

    toggleContextMenu(event, song) {
        event.stopPropagation();

        this.setState((prevState) => ({
            showContextMenu: !prevState.showContextMenu,
            selectedSong: song,
        }));
    }

    handleDeleteSong = async () => {
        const { selectedSong } = this.state;
        if (selectedSong) {
            await this.deleteSong(selectedSong.id);
            this.setState({ showContextMenu: false });
        }
    }

    handleOutSideClick(event) {
        if (this.state.showContextMenu && this.contextMenuRef && !this.contextMenuRef.contains(event.target)) {
            this.setState({ showContextMenu: false });
        }
    }

    async addToPlaylist(playlist) {
        const { selectedSong } = this.state;
        console.log(`Adding ${selectedSong.title} to playlist with ID: ${playlist.id}`);

        try {
            const userId = parseInt(localStorage.getItem('userId'), 10);
            const res = await fetch(`/api/playlists/add-song/${playlist.id}/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        "songId": [selectedSong.id],
                        "userId": userId
                    }
                )
            });
            const message = await res.json();

            if (res.ok) {
                
                this.setState({ showContextMenu: false });
            } else {
                window.alert(`Could not add song to playlist`);
                console.error(message.message);
            }
        } catch (error) {
            console.error("Error when adding song to playlist: ", error);
            window.alert(`Could not add song to playlist`);
        }
    }

    async deleteSong(songId) {
        try {
            const userId = parseInt(localStorage.getItem('userId'), 10);
            const res = await fetch(`/api/playlists/delete-song/${this.state.id}`, {
                method: 'PUT',
                headers: {
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

            if (res.ok) {
                this.setState((prevState) => ({
                    songs: prevState.songs.filter(song => song.id !== songId),
                    showContextMenu: false
                }));
            } else {
                window.alert(`Could not delete song from playlist`);
                console.error(message.message);
            }
        } catch (error) {
            console.error("Error when deleting song from playlist: ", error);
            window.alert(`Could not delete song from playlist`);
        }
    }

    displaySongs() {
        const { songs } = this.state;

        return songs.map((song, i) => {
            return (
                <div key={song.id} className="flex items-center bg-white rounded-lg shadow-md p-4 mb-4 relative">
                    <p className="text-gray-600 mr-4 w-12">{i + 1}</p> {/* Number */}
                    <h2 className="text-xl font-semibold text-gray-800 mr-4 flex-1">{song.title}</h2> {/* Name */}
                    <p className="text-gray-500 text-sm mr-4">{song.timestamp}</p> {/* Date */}
                    <iframe 
                        src={song.embedUrl} 
                        width="120" 
                        height="150" 
                        frameBorder="0" 
                        allowtransparency="true" 
                        allow="encrypted-media"
                        className=" rounded-lg" 
                    ></iframe> {/* Link (embedded media) */}
                    
                    <FontAwesomeIcon 
                        icon={faEllipsis} 
                        onClick={(e) => this.toggleContextMenu(e, song)} 
                        className="text-gray-600 cursor-pointer"
                    />

                    {this.state.showContextMenu && this.state.selectedSong === song && (
                        <div
                            className="absolute bg-white border border-gray-300 rounded shadow-md p-2 z-10"
                            ref={(node) => { this.contextMenuRef = node; }}
                            style={{ top: '40px', left: '10px' }} 
                        >
                            <h4 className="text-gray-700 font-semibold mb-2">Select Playlist:</h4>
                            
                            {this.state.playlists.length > 0 && this.state.playlists.some(playlist => parseInt(playlist.userId) === parseInt(this.state.userId)) && 
                                <p 
                                    onClick={this.handleDeleteSong} 
                                    className="text-red-600 cursor-pointer hover:underline mb-1"
                                >
                                    Delete Song
                                </p>
                            }
                            
                            <p 
                                onClick={() => this.setState({ showPlaylists: !this.state.showPlaylists })} 
                                className="text-blue-600 cursor-pointer hover:underline mb-1"
                            >
                                Add Song to Playlist
                            </p>

                            {this.state.showPlaylists && this.state.playlists.length > 0 && (
                                <div className="playlist-list mt-2">
                                    <h4 className="text-gray-700 font-semibold mb-1">Select Playlist:</h4>
                                    {this.state.playlists.map(playlist => (
                                        <p 
                                            key={playlist.id} 
                                            onClick={() => this.addToPlaylist(playlist)} 
                                            className="cursor-pointer hover:underline text-gray-800 mb-1"
                                        >
                                            {playlist.name}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            );
        });
    }

    render() {
        if (this.state.noSongs === true) {
            return <h1>No songs in this playlist</h1>;
        }

        return (
            <div>
                {this.displaySongs()}
            </div>
        );
    }
}

export default DisplaySongs;
