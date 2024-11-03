import React from 'react';
import { useParams } from 'react-router-dom';

import AddSong from '../components/AddSong'; 
import Nav from '../components/Nav';

const AddSongPage = () => 
{
    const {id, type} = useParams();
    
    return(
        <div>
            <Nav/>
    
            <AddSong id={id} type={type}/>

        </div>

    );
    
}

export default AddSongPage;