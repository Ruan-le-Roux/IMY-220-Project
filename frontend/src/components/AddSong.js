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
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSongSelect = this.handleSongSelect.bind(this);
        this.handleAddSongs = this.handleAddSongs.bind(this);
    }

    handleSubmit(e)
    {
        e.preventDefault();

        this.setState({addSong: true});
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
            // console.log(`Songs: ${this.state.selectedSongs}`);
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
        const {error, errorMessage} = this.state;
        if(this.state.addSong)
        {
            return <Navigate to = {`/PlaylistPage/${this.state.id}`}/>;
        }

        return(
            <div>
                <form onSubmit = {this.handleSubmit}>
                    <h1>Add a new song</h1>

                    <label>
                        Song name:<span>*</span>

                        <input type = 'text' placeholder = 'Song name' required/>
                    </label>

                    <label>
                        Artist:<span>*</span>

                        <input type = 'text' placeholder = 'Artist Name' required/>
                    </label>

                    <label>
                        Link:<span>*</span>

                        <input type = 'text' placeholder = 'link' required/>
                    </label>

                    <button type = 'submit'>Add Song</button>

                    <h1>Choose a song</h1>

                    {this.displaySongs()}

                    <button type='button' onClick={this.handleAddSongs}>Add Selected Songs</button>
                </form>
            </div>
        );
    }
}

export default AddSong;