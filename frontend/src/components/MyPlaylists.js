import React from 'react';
import { Navigate } from 'react-router-dom';

import playlistPic from '../../public/assets/images/album-cover.png';

import PlaylistComponent from './PlaylistComponent';

class MyPlaylists extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            seeAll: false,
            playLists: [],            
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

            const res = await fetch(`/api/playlist/my-playlists/${userId}`);
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
        catch(error)
        {
            console.error('Error getting my playlists: ', error);
        }
    }

    render()
    {
        if(this.state.seeAll)
        {
            return <Navigate to = '/PlaylistPage/12'/>
        }

        
        return(
            <div>
                <h1>My Playlists</h1>

                <button onClick = {this.handleSeeAll}>See All</button>

                <div>
                    {this.state.playlists.length > 0 ? (
                        this.state.playlists.map((playlist) => (
                            <section>
                                <img src = {playlistPic} alt = "Picture of Playlist" title = "Picture of Playlist"/>
                                
                                <div>
                                    <h4>{playlist.data.name}</h4>

                                    <p>me</p>
                                </div>
                            </section>

                        ))
                    ) : (
                        <p>no playLists</p>
                    )}
                </div>
            </div>
        );
    }
}

export default MyPlaylists;