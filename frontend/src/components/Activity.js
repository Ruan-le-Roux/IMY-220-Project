import React from 'react';
import { Navigate, Link } from 'react-router-dom';

import playlistPic from '../../public/assets/images/album-cover.png';
import PlaylistComponent from './PlaylistComponent';

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

    // handleClick(id)
    // {
    //     return <Navigate to={`/PlaylistPage/${id}`}/>
    // }

    displayPlaylists()
    {        
        const limitedPlaylists = this.state.playlists.slice(0, 5);

        return limitedPlaylists.map((playlist) => (
            <section key={playlist.id} className="bg-cBlue-600 rounded-lg p-4 mb-4 shadow-md">
            <Link to={`/PlaylistPage/${playlist.id}`} className="flex items-center">
                <img 
                    src={playlist.coverImage}
                    alt={`Cover of ${playlist.name}`} 
                    title={`Cover of ${playlist.name}`} 
                    className="h-20 w-20 rounded-md mr-4" 
                />
                
                <div>
                    <h4 className="text-lg font-semibold">{playlist.name}</h4>
                    <p className="text-gray-300">{playlist.owner}</p>
                </div>
            </Link>
        </section>
        ));
    }



    render()
    {
        if(this.state.seeAll)
        {
            const temp = 'a';
            return <Navigate to = {`/PlaylistFeedPage/${temp}`}/>
        }

        if(this.state.error === true)
        {
            return (
                <div className="p-4 shadow-md">
                    <h1 className="text-xl font-bold">Activity</h1>
                    <p className="text-red-500">{this.state.errorMessage}</p>
                </div>
            );
        }

        return(
            <div className="p-4 shadow-md" >
                <h1 className="text-xl font-bold">Activity</h1>
                <button 
                    onClick={this.handleSeeAll} 
                    className="bg-cPink text-white px-4 py-2 rounded-md mb-4 transition duration-200 hover:bg-cPink-dark"
                >
                    See All
                </button>

                <div className="grid grid-cols-1 gap-4">
                    {this.displayPlaylists()}
                </div>
            </div>
        );
    }
}

export default Activity;