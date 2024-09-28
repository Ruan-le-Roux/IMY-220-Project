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
        };

        this.handleSeeAll = this.handleSeeAll.bind(this);
    }

    handleSeeAll()
    {
        this.setState({seeAll: true});        
    }


    render()
    {

        if(this.state.seeAll)
        {
            return <Navigate to = '/SongFeedPage'/>
        }
        return(
            <div>
                <h1>Songs</h1>

                <button onClick = {this.handleSeeAll}>See All</button>

                <div>
                    <section>
                        <img src = {albumPic} arc = "Picture of Album" title = "Picture of Album"/>
                        
                        <div>
                            <h4>Song Name</h4>

                            <p>Artist Name</p>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default Songs;