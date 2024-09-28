import React from 'react';

class SearchComponent extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(
            <div>
                <input type = "text" placeholder = 'search for song/playlist'/>
            </div>
        );
    }
}

export default SearchComponent;