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
            const res = await fetch(`/api/playlists/${this.state.id}`);
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
                <div key={song.id}>
                    <p>{i + 1}</p>
                    <h2>{song.title}</h2>
                    <p>{song.artist}</p>
                    <p>{song.timestamp}</p>
                    <iframe src={song.embedUrl} width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                    <FontAwesomeIcon icon={faEllipsis} onClick={(e) => this.toggleContextMenu(e, song)} />

                    {this.state.showContextMenu && this.state.selectedSong === song && (
                        <div
                            className="context-menu"
                            ref={(node) => { this.contextMenuRef = node; }}
                            style={{ position: 'absolute', background: 'white', border: '1px solid #ccc', padding: '10px' }}>
                            <h4>Select Playlist:</h4>
                            
                            {parseInt(this.state.playlists.userId) === parseInt(this.state.userId) && 
                                <p onClick={this.handleDeleteSong} style={{ cursor: 'pointer' }}>
                                    Delete Song
                                </p>
                            
                            }
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
