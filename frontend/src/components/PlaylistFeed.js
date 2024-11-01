import React from 'react';
import { Navigate, Link} from 'react-router-dom';

import playlistPic from '../../public/assets/images/album-cover.png';
import PlaylistComponent from './PlaylistComponent';

class PlaylistFeed extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            playlists: [],
            type: this.props.type,
        };
    }

    async componentDidMount()
    {
        const { type } = this.state;
        try
        {
            if(type === 'a')
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
                }
            }
            else if( type === 'p')
            {
    
            }
        }
        catch(error)
        {
            console.error("Error in api call: ", error);
        }

    }

    displayPlaylists()
    {
        const { type } = this.state;

        if(type === 'a')
        {
            return (
                <div>
                    <h1>Activity Playlist Feed</h1>
    
                    {this.state.playlists.map((playlist) => (
                        <section key={playlist.id} >
                            <Link to={`/PlaylistPage/${playlist.id}`}>
                                <img src = {playlistPic} alt = "Picture of Playlist" title = "Picture of Playlist"/>
                                
                                <div>
                                    <h4>{playlist.name}</h4>
        
                                    <p>{playlist.owner}</p>
                                </div>
                            </Link>
                        </section>
                    ))}
                </div>
            );
        }
        else
        {
            return (
                <div>
                    <h1>Playlist Feed</h1>
    
                    {this.state.playlists.map((playlist) => (
                        <section key={playlist.id} >
                            <Link to={`/PlaylistPage/${playlist.id}`}>
                                <img src = {playlistPic} alt = "Picture of Playlist" title = "Picture of Playlist"/>
                                
                                <div>
                                    <h4>{playlist.name}</h4>
        
                                    <p>{playlist.owner}</p>
                                </div>
                            </Link>
                        </section>
                    ))}
                </div>
            );
        }


    }



    render()
    {
        return(
            this.displayPlaylists()
        );
    }
}

export default PlaylistFeed;