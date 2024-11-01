import React from 'react';
import { useParams } from 'react-router-dom';

import Nav from '../components/Nav';
import PlaylistFeed from '../components/PlaylistFeed';

const PlaylistFeedPage = () => 
{
    const { type } = useParams();

    return(
        <div>
            <Nav/>

            <PlaylistFeed type={type}/>
        </div>
    );
}

export default PlaylistFeedPage;