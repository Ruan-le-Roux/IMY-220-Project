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
            return <p className="text-red-500">No songs found</p>;
        }

        const limitedSongs = this.state.songs.slice(0, 5);

        return limitedSongs.map((song) => (
            

            <section key={song.id} className="border border-cPink rounded-lg p-4 mb-4 bg-cDarkGray hover:shadow-lg transition-shadow duration-200">
            <iframe 
                src={song.embedUrl} 
                width="300" 
                height="380" 
                frameBorder="0" 
                allowtransparency="true" 
                allow="encrypted-media"
                className="rounded-md"
            ></iframe>

            <div className="mt-2">
                <h4 className="text-lg font-semibold text-cWhite">{song.title}</h4>
                <p className="text-cGray">{song.artist}</p>
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
            <div className="bg-cBlue p-6 rounded-md text-cWhite shadow-md">
                <h1 className="text-2xl font-bold mb-4">My Songs</h1>
                {this.state.songs.length !== 0 && (
                    <button 
                        onClick={this.handleSeeAll} 
                        className="bg-cPink text-white px-4 py-2 rounded-md transition duration-200 hover:bg-cPink-dark"
                    >
                        See All
                    </button>
                )}
                

                <div className="mt-4">
                    {this.renderSongs()}                    
                </div>
            </div>

        );
    }
}

export default Songs;