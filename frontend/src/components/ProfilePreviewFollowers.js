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
            <section key={user.id}>
                <img src={user.profilePicture} alt={`${user.name}'s profile`} title={`${user.name}'s profile`} />
                <h3>{user.name} {user.surname}</h3>
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
            <div>
                <section>
                    <h2>Followers</h2>
                    <button onClick={this.handleFollowers}>See all</button>

                    <div>
                        {this.displayFollowers()} 
                    </div>
                </section>
            </div>
        );
    }
}

export default ProfilePreviewFollowers;