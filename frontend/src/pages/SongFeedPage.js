import React from 'react';
import { useParams } from 'react-router-dom';

import Nav from '../components/Nav';
import SongFeed from '../components/SongFeed';

const SongFeedPage = () => 
{
    const {type} = useParams();
    return(
        <div className="bg-cBlue min-h-lvh">
            <Nav />
            
            <SongFeed type={type} />
        </div>
    );
}

export default SongFeedPage;