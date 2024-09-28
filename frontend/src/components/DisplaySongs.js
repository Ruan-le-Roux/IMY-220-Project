import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

import albumPic from '../../public/assets/images/album-cover.png';

class DisplaySongs extends React.Component
{
    render()
    {
        return(
            <div>
                <div>
                    <p>1</p>

                    <img src = {albumPic} alt = 'Album cover' title = 'Album cover'/>                    

                    <h2>Song name</h2>

                    <p>artist</p>

                    <p>date</p>

                    <p><a>link</a></p>

                    <FontAwesomeIcon icon = {faEllipsis} />
                </div>
                <div>
                    <p>2</p>

                    <img src = {albumPic} alt = 'Album cover' title = 'Album cover'/>                    

                    <h2>Song name</h2>

                    <p>artist</p>

                    <p>date</p>

                    <p><a>link</a></p>

                    <FontAwesomeIcon icon = {faEllipsis} />
                </div>
                <div>
                    <p>3</p>

                    <img src = {albumPic} alt = 'Album cover' title = 'Album cover'/>                    

                    <h2>Song name</h2>

                    <p>artist</p>

                    <p>date</p>

                    <p><a>link</a></p>

                    <FontAwesomeIcon icon = {faEllipsis} />
                </div>
                <div>
                    <p>4</p>

                    <img src = {albumPic} alt = 'Album cover' title = 'Album cover'/>                    

                    <h2>Song name</h2>

                    <p>artist</p>

                    <p>date</p>

                    <p><a>link</a></p>

                    <FontAwesomeIcon icon = {faEllipsis} />
                </div>
            </div>
        );
    }
}

export default DisplaySongs;