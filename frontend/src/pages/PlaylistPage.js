import React from 'react';
import { useParams } from 'react-router-dom';

import PlaylistComponent from '../components/PlaylistComponent';
import Nav from '../components/Nav';

const PlaylistPage = () => 
{
    const {playlistId} = useParams();
 
    return(
        <div>
            <Nav/>
            
            <PlaylistComponent playlistId={playlistId}/>

        </div>
    );
 

}

export default PlaylistPage;