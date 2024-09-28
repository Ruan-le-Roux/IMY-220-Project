import React from 'react';
import { Navigate } from 'react-router-dom';

import playlistPic from '../../public/assets/images/album-cover.png';
import PlaylistComponent from './PlaylistComponent';

class PlaylistFeed extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            open: false,
        };


        this.handleSeeAll = this.handleSeeAll.bind(this);
    }

    handleSeeAll()
    {
        this.setState({open: true});
    }


    render()
    {
        if(this.state.open)
        {
            return <PlaylistComponent/>
        }

        return(
            <div>
                <h1>Playlist Feed</h1>

                <div>
                    <section>
                        <button onClick = {this.handleSeeAll}>Open</button>
                        <img src = {playlistPic} arc = "Picture of Playlist" title = "Picture of Playlist"/>
                        
                        <div>
                            <h4>Playlist Name</h4>

                            <p>By Name</p>
                        </div>
                    </section>

                    <section>
                        <button onClick = {this.handleSeeAll}>Open</button>
                        <img src = {playlistPic} arc = "Picture of Playlist" title = "Picture of Playlist"/>
                        
                        <div>
                            <h4>Playlist Name</h4>

                            <p>By Name</p>
                        </div>
                    </section>

                    <section>
                        <button onClick = {this.handleSeeAll}>Open</button>
                        <img src = {playlistPic} arc = "Picture of Playlist" title = "Picture of Playlist"/>
                        
                        <div>
                            <h4>Playlist Name</h4>

                            <p>By Name</p>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default PlaylistFeed;