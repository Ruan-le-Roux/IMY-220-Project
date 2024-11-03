import React from 'react';

import profilePic from '../../public/assets/images/profile-pic.png'; 

import FollowingComponent from './FollowingComponent';
import FriendsPage from '../pages/FriendsPage';
import { Navigate } from 'react-router-dom';

class ProfilePreviewFollowers extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            followers: [],
            error: false,
            users: [],
            seeAll: false,
            userId: this.props.userId,
        };

        this.handleFollowers = this.handleFollowers.bind(this);
        // this.closeComponent = this.closeComponent.bind(this);
    }

    async componentDidMount()
    {
        try
        {
            const res = await fetch(`/api/users/get-followers/${this.state.userId}`);
            const data = await res.json();

            if(res.ok)
            {
                this.setState({followers: data.data}, () => this.getUsers());
            }
            else
            {
                console.error(data.message);
                this.setState({error: true});
            }
        }
        catch(error)
        {
            console.error("Error getting followers: ", error);
            this.setState({error: true});
        }
    }

    async getUsers()
    {
        const userPromises = this.state.followers.map(async (userId) => {
            const res = await fetch(`/api/users/${userId}`); 
            const data = await res.json();
            return data.data;
        });

        try 
        {
            const users = await Promise.all(userPromises); 
            this.setState({ users });
        } 
        catch (error) 
        {
            console.error("Error fetching users: ", error);
            this.setState({error: true});
        }
    }


    handleFollowers()
    {
        this.setState({seeAll: true});
    }

    displayFollowers()
    {
        const limited = this.state.users.slice(0, 3);

        return limited.map((user) => (
            <section key={user.id} className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-md mb-4">
            <img 
                src={user.profilePicture} 
                alt={`${user.name}'s profile`} 
                title={`${user.name}'s profile`} 
                className="w-12 h-12 rounded-full object-cover"
            />
            <h3 className="text-lg font-semibold">{user.name} {user.surname}</h3>
        </section>
        )); 
    }

    
    render()
    {
        // const { following } = this.state;

        if(this.state.seeAll)
        {
            return <Navigate to="/FriendsPage/er" state={{ userId: this.state.userId }}/>
        }

        return(
            <div className="p-6 bg-white rounded-lg shadow-lg">
            <section className="mb-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Followers</h2>
                    <button 
                        onClick={this.handleFollowers} 
                        className="text-cBlack font-medium hover:underline bg-cPink p-4 rounded"
                    >
                        See all
                    </button>
                </div>

                <div className="mt-4 space-y-4">
                    {this.displayFollowers()}
                </div>
            </section>
        </div>
        );
    }
}

export default ProfilePreviewFollowers;