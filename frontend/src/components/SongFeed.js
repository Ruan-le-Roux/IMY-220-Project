import React from 'react';
import { Navigate } from 'react-router-dom';

import playlistPic from '../../public/assets/images/album-cover.png';


class SongFeed extends React.Component
{
    

    render()
    {
        return(
            <div>
                <h1>Song Feed</h1>

                <main>
                    <div>
                        <h1>#</h1>
                        <h1>Name</h1>
                        <h1>Date Added</h1>
                        <h1>Link</h1>
                    </div>

                    <section>
                        <p>1</p>

                        

                        <img src = {playlistPic} arc = "Picture of Playlist" title = "Picture of Playlist"/>
                        
                        <div>
                            <h1>Song Name</h1>

                            <h2>Artist Name</h2>
                        </div>
                        
                        <p>date</p>

                        <a>link to song</a>                        
                    </section>

                    <section>
                        <p>1</p>

                        {/* <button onClick = {this.handleSeeAll}>Open</button> */}

                        <img src = {playlistPic} arc = "Picture of Playlist" title = "Picture of Playlist"/>
                        
                        <div>
                            <h1>Song Name</h1>

                            <h2>Artist Name</h2>
                        </div>
                        
                        <p>date</p>

                        <a>link to song</a>                        
                    </section>
                    
                    <section>
                        <p>1</p>

                        {/* <button onClick = {this.handleSeeAll}>Open</button> */}

                        <img src = {playlistPic} arc = "Picture of Playlist" title = "Picture of Playlist"/>
                        
                        <div>
                            <h1>Song Name</h1>

                            <h2>Artist Name</h2>
                        </div>
                        
                        <p>date</p>

                        <a>link to song</a>                        
                    </section>
                </main>
            </div>
        );
    }
}

export default SongFeed;