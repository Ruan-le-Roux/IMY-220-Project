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

        console.log(`type: ${this.state.type}`);

        if(this.state.type === 's')
        {
            console.log(`this is the type: ${type}`);
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
                <section key={song.id} onClick={() => this.handleSongSelect(song.id)}>
                    <h1>{song.title}</h1>
                    <p>{song.artist}</p>
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
            <div>
                <form onSubmit = {this.handleSubmit}>
                    <h1>Add a new song</h1>

                    <label>
                        Song name:<span>*</span>

                        <input type = 'text' name='name' placeholder = 'name' value={name} required onChange={this.handleChange}/>
                    </label>

                    <label>
                        Artist:<span>*</span>

                        <input type = 'text' name='artist' placeholder = 'artist' value={artist} required onChange={this.handleChange}/>
                    </label>

                    <label>
                        Link:<span>*</span>

                        <input type = 'text' name='link' placeholder = 'link' value={link} required onChange={this.handleChange}/>
                    </label>

                    <button type = 'submit'>Add Song</button>
                </form>

                <h1>Choose a song</h1>

                {this.displaySongs()}

                <button type='button' onClick={this.handleAddSongs}>Add Selected Songs</button>
            </div>
        );
    }
}

export default AddSong;