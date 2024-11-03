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
            <div className="relative">
                        <input 
                            type="text" 
                            placeholder='Search for song/playlist' 
                            className="border border-cBlack rounded-full py-2 px-4 w-80 focus:outline-none focus:ring-2 focus:ring-cPink transition duration-200 placeholder-gray-400" 
                        />
                    </div>
        );
    }
}

export default SearchComponent;