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
            userId: this.props.userId

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

            const res = await fetch(`/api/playlists/my-playlists/${this.state.userId}`);
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

    refreshPlaylists = async () => {
        try {
            const res = await fetch(`/api/playlists/my-playlists/${this.state.userId}`);
            const data = await res.json();

            if (res.ok) {
                this.setState({ playlists: data.data });
            } else {
                console.error(data.message);
                this.setState({ error: true, errorMessage: data.message });
            }
        } catch (error) {
            console.error('Error getting my playlists: ', error);
        }
    };

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
                <div className="bg-cBlue p-6 rounded-md shadow-md text-cWhite">
                    <h1 className="text-2xl font-bold">My Playlists</h1>
                    <p className="text-red-500">{this.state.errorMessage}</p>
                </div>
            );
        }
        
        return(
            <div className="bg-cBlue p-6 rounded-md shadow-md text-cWhite">
            <h1 className="text-2xl font-bold">My Playlists</h1>

            <button 
                onClick={this.handleSeeAll} 
                className="bg-cPink text-white px-4 py-2 rounded-md mb-4 transition duration-200 hover:bg-cPink-dark"
            >
                See All
            </button>

            <div className="grid grid-cols-1 gap-4">
                {this.state.playlists.length > 0 ? (
                    this.state.playlists.map((playlist) => (
                        <section key={playlist.id} className="border border-cPink rounded-lg p-4 hover:shadow-lg transition-shadow duration-200">
                            <Link to={`/playlistPage/${playlist.id}`}>
                                <img 
                                    src={playlist.coverImage} 
                                    alt={`Cover of ${playlist.name}`} 
                                    title={`Picture of ${playlist.name}`} 
                                    className="h-20 w-20 rounded-md mr-4 object-cover" 
                                />
                                
                                <div>
                                    <h4 className="text-lg font-semibold">{playlist.name}</h4>
                                    <p className="text-cGray">me</p>
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