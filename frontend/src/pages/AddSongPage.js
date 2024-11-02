import React from 'react';
import { useParams } from 'react-router-dom';

import AddSong from '../components/AddSong'; 
import Nav from '../components/Nav';

const AddSongPage = () => 
{
    const {id} = useParams();
    
    return(
        <div>
            <Nav/>
    
            <AddSong id={id} />

        </div>

    );
    
}

export default AddSongPage;