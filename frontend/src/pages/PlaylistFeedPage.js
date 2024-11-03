import React from 'react';
import { useParams } from 'react-router-dom';

import Nav from '../components/Nav';
import PlaylistFeed from '../components/PlaylistFeed';

const PlaylistFeedPage = () => 
{
    const { type } = useParams();

    return(
        <div className="flex flex-col min-h-screen">
            <Nav />
            
            <main className="flex-grow bg-cBlue">
                <PlaylistFeed type={type} />
            </main>
        </div>
    );
}

export default PlaylistFeedPage;