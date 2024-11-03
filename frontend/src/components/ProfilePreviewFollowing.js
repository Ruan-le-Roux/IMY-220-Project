import React from 'react';

import profilePic from '../../public/assets/images/profile-pic.png'; 

import FollowingComponent from './FollowingComponent';
import FriendsPage from '../pages/FriendsPage';
import { Navigate } from 'react-router-dom';

class ProfilePreviewFollowing extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            following: [],
            error: false,
            users: [],
            seeAll: false,
            userId: this.props.userId,
        };

        this.handleFollowing = this.handleFollowing.bind(this);
        // this.closeComponent = this.closeComponent.bind(this);
    }

    async componentDidMount()
    {
        try
        {
            const res = await fetch(`/api/users/get-following/${this.state.userId}`);
            const data = await res.json();

            if(res.ok)
            {
                this.setState({following: data.data}, () => this.getUsers());
            }
            else
            {
                console.error(data.message);
                this.setState({error: true});
            }
        }
        catch(error)
        {
            console.error("Error getting following: ", error);
            this.setState({error: true});
        }
    }

    async getUsers()
    {
        const userPromises = this.state.following.map(async (userId) => {
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


    handleFollowing()
    {
        this.setState({seeAll: true});
    }

    displayFollowing()
    {
        const limited = this.state.users.slice(0, 3);

        return limited.map((user) => (
            <section key={user.id}>
                <img src={user.profilePicture} alt={`${user.name}'s profile`} title={`${user.name}'s profile`} />
                <h3>{user.name} {user.surname}</h3>
            </section>
        )); 
    }

    
    render()
    {
        const { following } = this.state;

        if(this.state.seeAll)
        {
            return <Navigate to="/FriendsPage/fol" state={{ userId: this.state.userId }}/>
        }

        return(
            <div>
                <section>
                    <h2>Following</h2>
                    <button onClick={this.handleFollowing}>See all</button>

                    <div>
                        {this.displayFollowing()} 
                    </div>
                </section>
            </div>
        );
    }
}

export default ProfilePreviewFollowing;