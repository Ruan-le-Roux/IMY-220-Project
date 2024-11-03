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
                const userId = localStorage.getItem('userId');
                const res = await fetch(`/api/playlists/my-playlists/${userId}`);
                const data = await res.json();
    
                if(res.ok)
                {
                    console.log(`here is the playlists: ${data.data}`);
                    this.setState({playlists: data.data});
                }
                else
                {
                    console.error(data.message);
                }
    
            }
            else if(type === 'feed')
            {
                const userId = localStorage.getItem('userId');
                const res = await fetch(`/api/playlists`);
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
        }
        catch(error)
        {
            console.error("Error in api call: ", error);
        }
    }

    displayPlaylists() {
        const { type } = this.state;
    
        if (type === 'a') {
            return (
                <div>
                    <h1 className="text-2xl font-bold mb-4">Activity Playlist Feed</h1>
    
                    <div className="grid grid-cols-4 gap-4">
                        {this.state.playlists.map((playlist) => (
                            <section key={playlist.id} className="bg-gray-100 rounded-lg p-4 text-center shadow">
                                <Link to={`/PlaylistPage/${playlist.id}`}>
                                    <img 
                                        src={playlist.coverImage} 
                                        alt="Picture of Playlist" 
                                        title="Picture of Playlist" 
                                        className="w-full h-40 object-cover rounded-md mb-2" 
                                    />
                                    <div>
                                        <h4 className="text-lg font-semibold">{playlist.name}</h4>
                                        <p className="text-gray-600">{playlist.owner}</p>
                                    </div>
                                </Link>
                            </section>
                        ))}
                    </div>
                </div>
            );
        } else {
            console.log(`All playlists: ${this.state.playlists}`);
            return (
                <div>
                    <h1 className="text-2xl font-bold mb-4">Playlist Feed</h1>
    
                    <div className="grid grid-cols-4 gap-4">
                        {this.state.playlists.map((playlist) => (
                            <section key={playlist.id} className="bg-cWhite rounded-lg p-4 text-center shadow">
                                <Link to={`/PlaylistPage/${playlist.id}`}>
                                    <img 
                                        src={playlist.coverImage} 
                                        alt="Picture of Playlist" 
                                        title="Picture of Playlist" 
                                        className="w-full h-40 object-cover rounded-md mb-2" 
                                    />
                                    <div>
                                        <h4 className="text-lg font-semibold">{playlist.name}</h4>
                                        <p className="text-gray-600">{playlist.owner}</p>
                                    </div>
                                </Link>
                            </section>
                        ))}
                    </div>
                </div>
            );
        }
    }
    
    render() {
        return (
            <div className="p-4">
                {this.displayPlaylists()}

            </div>
        );
    }
}

export default PlaylistFeed;