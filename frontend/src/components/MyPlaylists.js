import React from 'react';
import { Navigate, Link } from 'react-router-dom';

import playlistPic from '../../public/assets/images/album-cover.png';

import PlaylistComponent from './PlaylistComponent';

class MyPlaylists extends React.Component
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

            const res = await fetch(`/api/playlists/my-playlists/${userId}`);
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
            console.error('Error getting my playlists: ', error);
        }
    }

    render()
    {
        if(this.state.seeAll)
        {
            const temp = 'p';
            return <Navigate to = {`/PlaylistFeedPage/${temp}`}/>
        }

        if(this.state.error === true)
        {
            return(
                <div>
                    <h1>My Playlists</h1>
                    
                    <p>{this.state.errorMessage}</p>
                </div>
            );
        }
        
        return(
            <div>
                <h1>My Playlists</h1>

                <button onClick = {this.handleSeeAll}>See All</button>

                <div>
                    {this.state.playlists.length > 0 ? (
                        this.state.playlists.map((playlist) => (
                            <section key={playlist.id}>
                                <Link to={`/playlistPage/${playlist.id}`}>
                                    <img src={playlistPic} alt={`Cover of ${playlist.name}`} title="Picture of Playlist" />
                                    
                                    <div>
                                        <h4>{playlist.name}</h4>
                                        <p>me</p>
                                    </div>                                
                                </Link>
                            </section>
                        ))
                    ) : (
                        <p>No playlists available.</p>  
                    )}
                </div>
            </div>
        );
    }
}

export default MyPlaylists;