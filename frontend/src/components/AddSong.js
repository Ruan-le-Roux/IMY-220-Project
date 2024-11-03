import React from 'react';
import { Navigate } from 'react-router-dom';

import Nav from './Nav';

class AddSong extends React.Component
{

    constructor(props)
    {
        super(props);

        this.state = {
            addSong: false,
            songs: [],
            error: false,
            errorMessage: '',
            selectedSongs: [],
            id: this.props.id,
            name: '',
            artist: '',
            link: '',
            type: this.props.type,
            done: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSongSelect = this.handleSongSelect.bind(this);
        this.handleAddSongs = this.handleAddSongs.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) 
    {
        this.setState({ [e.target.name]: e.target.value });
    }

    async handleSubmit(e)
    {
        e.preventDefault();

        // console.log(`type: ${this.state.type}`);

        if(this.state.type === 's')
        {
            // console.log(`this is the type: ${type}`);
            try
            {
                const userId = parseInt(localStorage.getItem('userId'));
                const res = await fetch(`/api/songs/add-song`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title: this.state.name,
                        artist: this.state.artist,
                        link: this.state.link,
                        userId: userId
                    })
                });
                const data = await res.json();
    
                if(res.ok)
                {
                    this.setState({selectedSongs: [data.data]});
                    // window.alert("Song added");

                    this.setState({done: true});
                }
                else
                {
                    console.error(data.message);
                    window.alert("Songs could not be added to playlist");
                }
            }
            catch(error)
            {
                console.error("Error when adding song to playlist: ", error);
                window.alert("Songs could not be added to playlist");
            }
        }
        else
        {

            try
            {
                const userId = parseInt(localStorage.getItem('userId'));
                const res = await fetch(`/api/songs/add-song`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        title: this.state.name,
                        artist: this.state.artist,
                        link: this.state.link,
                        userId: userId
                    })
                });
                const data = await res.json();
    
                if(res.ok)
                {
                    this.setState({selectedSongs: [data.data]}, () => {
                        this.handleAddSongs();
    
                    });
                    // this.setState({addSong: true});
                }
                else
                {
                    console.error(data.message);
                    window.alert("Songs could not be added to playlist");
                }
            }
            catch(error)
            {
                console.error("Error when adding song to playlist: ", error);
                window.alert("Songs could not be added to playlist");
            }
        }


    }

    async componentDidMount()
    {
        try
        {
            const res = await fetch('/api/songs');
            const data = await res.json();
    
            if(res.ok)
            {
                this.setState({songs: data.data});
                console.log(data.data);
            }
            else
            {
                this.setState({errorMessage: "There are no songs to choose from", error: true});
                console.error(data.message);
            }
        }
        catch(error)
        {
            console.error("Error when getting all songs: ", error);
            this.setState({errorMessage: "There are no songs to choose from", error: true});
        }
    }

    handleSongSelect(songId)
    {
        console.log("selected: ", this.state.selectedSongs);
        this.setState((prevState) => {
            const selectedSongs = prevState.selectedSongs.includes(songId)
            ? prevState.selectedSongs.filter(id => id !== songId)
            : [...prevState.selectedSongs, songId];
            
            return { selectedSongs };
        });
    }

    async handleAddSongs()
    {
        try
        {
            console.log(`Songs: ${this.state.selectedSongs}`);
            const userId = parseInt(localStorage.getItem('userId'));
            const res = await fetch(`/api/playlists/add-song/${this.state.id}/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({songId: this.state.selectedSongs})
            });
            const data = await res.json();

            if(res.ok)
            {
                window.alert("Songs added to playlist");
                this.setState({addSong: true});
            }
            else
            {
                window.alert("Songs could not be added to playlist");
                console.log(data.message);
            }        
        }
        catch(error)
        {
            console.error("Error when adding songs to playlists: ", error);
            window.alert("Songs could not be added to playlist");
        }
    }

    displaySongs()
    {
        const {songs, error, errorMessage} = this.state;

        // console.log("sedpioufb", songs);

        if(error === true)
        {
            return(
                <div>
                    <h1>{errorMessage}</h1>
                </div>
            );
        }
        else if(songs.length > 0)
        {
            // const limitedSongs = songs.splice(0, 20);
            return songs.map((song) => (
                <section
                    key={song.id}
                    onClick={() => this.handleSongSelect(song.id)}
                    className="p-4 mb-4 bg-white shadow-md rounded-lg cursor-pointer hover:bg-gray-100 transition duration-200"
                >
                    <h1 className="text-lg font-bold text-cBlack">{song.title}</h1>
                    <p className="text-sm text-gray-600">{song.artist}</p>
                </section>
            ));

            // return(
            //     <div>
            //         <input type='text'/>
            //         <button type='submit'>Search</button>

            //         {build}

            //     </div>
            // );
            
        }

    }


    render()
    {
        const {error, errorMessage, name, artist, link} = this.state;
        
        if(this.state.addSong)
        {
            return <Navigate to = {`/PlaylistPage/${this.state.id}`}/>;
        }

        if(this.state.done)
        {
            const userId = localStorage.getItem('userId');
            return <Navigate to = {`/ProfilePage/${userId}`}/>;
        }

        return(
            <div className="p-6 bg-cBlue rounded-lg shadow-lg h-lvh">
                <form onSubmit={this.handleSubmit} className="space-y-4">
                    <h1 className="text-2xl font-bold text-cBlack">Add a new song</h1>

                    <label className="block">
                        <span className="text-cBlack">Song name:<span className="text-red-500">*</span></span>
                        <input
                            type="text"
                            name="name"
                            placeholder="name"
                            value={name}
                            required
                            onChange={this.handleChange}
                            className="mt-1 block w-full p-2 border border-cBlack rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </label>

                    <label className="block">
                        <span className="text-cBlack">Artist:<span className="text-red-500">*</span></span>
                        <input
                            type="text"
                            name="artist"
                            placeholder="artist"
                            value={artist}
                            required
                            onChange={this.handleChange}
                            className="mt-1 block w-full p-2 border border-cBlack rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </label>

                    <label className="block">
                        <span className="text-cBlack">Link:<span className="text-red-500">*</span></span>
                        <input
                            type="text"
                            name="link"
                            placeholder="link"
                            value={link}
                            required
                            onChange={this.handleChange}
                            className="mt-1 block w-full p-2 border border-cBlack rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </label>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200"
                    >
                        Add Song
                    </button>
                </form>

                <h1 className="mt-8 text-xl font-semibold text-cBlack">Choose a song</h1>

                <button
                    type="button"
                    onClick={this.handleAddSongs}
                    className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
                >
                    Add Selected Songs
                </button>

                <div className="mt-4">
                    {this.displaySongs()}
                </div>
            </div>

        );
    }
}

export default AddSong;