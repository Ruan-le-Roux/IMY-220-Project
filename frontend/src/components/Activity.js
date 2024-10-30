import React from 'react';
import { Navigate } from 'react-router-dom';

import playlistPic from '../../public/assets/images/album-cover.png'

class Activity extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            seeAll: false,
            playlists: [],
            error: false,
            errorMessage: '',
        };

        this.handleSeeAll = this.handleSeeAll.bind(this);
    }

    handleSeeAll()
    {
        this.setState({seeAll: true});
    }

    async componentDidMount()
    {
        try
        {
            const userId = localStorage.getItem('userId');
            const res = await fetch(`/api/playlists/active-playlists/${userId}`);
            const data = await res.json();

            if(res.ok)
            {
                this.setState({playlists: data.data});
            }
            else
            {
                console.error(data.message);
                this.setState({error: true, errorMessage: data.message});
            }
        }
        catch(error)
        {
            console.error("Error when loading activity list: ", error);
            this.setState({error: true, errorMessage: "Failed to fetch playlists"})

        }

    }

    displayPlaylists()
    {
        return this.state.playlists.map((playlist) => (
            <section key={playlist.id}>
                <img src = {playlistPic} alt = "Picture of Playlist" title = "Picture of Playlist"/>
                
                <div>
                    <h4>{playlist.name}</h4>

                    <p>{playlist.owner}</p>
                </div>
            </section>
        ));
    }



    render()
    {
        if(this.state.seeAll)
        {
            return <Navigate to = '/PlaylistFeedPage'/>
        }

        if(this.state.error === true)
        {
            return (
                <div>
                    <h1>Activity</h1>

                    <p>{this.state.errorMessage}</p>
                </div>
            );
        }

        return(
            <div>
                <h1>Activity</h1>

                <button onClick = {this.handleSeeAll}>See All</button>

                <div>
                    {this.displayPlaylists()}
                </div>
            </div>
        );
    }
}

export default Activity;