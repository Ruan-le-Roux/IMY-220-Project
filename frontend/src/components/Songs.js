import React from 'react';
import { Navigate } from 'react-router-dom';

import albumPic from '../../public/assets/images/album-cover.png';
import SongFeed from './SongFeed';

class Songs extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            seeAll: false,
            songs: [],
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
            const res = await fetch(`/api/songs/my-songs/${userId}`);
            const data = await res.json();

            if(res.ok)
            {
                this.setState({ songs: data.data });
            }
            else
            {
                console.error(data.message);
            }
        }
        catch(error)
        {
            console.error('Error when getting my songs: ', error);
        }
    }

    renderSongs()
    {
        if(this.state.songs.length === 0)
        {
            return <p>No songs found</p>
        }

        const limitedSongs = this.state.songs.slice(0, 5);

        return limitedSongs.map((song) => (
            <section key={song.id}>
                <iframe src={song.embedUrl} width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>

                <div>
                    <h4>{song.title}</h4>
                    <p>{song.artist}</p>
                </div>
            </section>
        ));
    }


    render()
    {

        if(this.state.seeAll)
        {
            const type = 'home';
            return <Navigate to = {`/SongFeedPage/${type}`}/>
        }
        return(
            <div>
                <h1>My Songs</h1>

                <button onClick = {this.handleSeeAll}>See All</button>

                <div>
                    {this.renderSongs()}                    
                </div>
            </div>
        );
    }
}

export default Songs;