import React from 'react';
import { Navigate } from 'react-router-dom';

import playlistPic from '../../public/assets/images/album-cover.png'

class Activity extends React.Component
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
            return <Navigate to = '/PlaylistFeedPage'/>
        }

        return(
            <div>
                <h1>Activity</h1>

                <button onClick = {this.handleSeeAll}>See All</button>

                <div>
                    <section>
                        <img src = {playlistPic} arc = "Picture of Playlist" title = "Picture of Playlist"/>
                        
                        <div>
                            <h4>Playlist Name</h4>

                            <p>Owner: Name</p>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default Activity;