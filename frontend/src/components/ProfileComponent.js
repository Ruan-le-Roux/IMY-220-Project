import React from 'react';
import { Navigate, Link, useParams } from 'react-router-dom';

import EditProfile from './EditProfile';
import CreatePlaylist from './CreatePlaylist';

import profilePic from '../../public/assets/images/album-cover.png';
import instagram from '../../public/assets/images/instagram.png';
import facebook from '../../public/assets/images/facebook.png';
import tiktok from '../../public/assets/images/tiktok.png';
import twitter from '../../public/assets/images/twitter.png';

class ProfileComponent extends React.Component
{
    constructor(props)
    {
        super(props);
        
        this.state = {
            edit: false,
            playlist: false,
            song: false,
            userId: this.props.userId,
            user: '',
            following: false,
            
        };
        
        this.editProfile = this.editProfile.bind(this);
        this.createPlaylist = this.createPlaylist.bind(this);
        this.addSong = this.addSong.bind(this);
        this.refreshUserData = this.refreshUserData.bind(this);
        this.handleFollow = this.handleFollow.bind(this);
    }

    // async componentDidMount()
    // {
    //     try
    //     {
    //         const res = await fetch(`/api/users/${this.state.userId}`);
    //         const data = await res.json();

    //         if(res.ok)
    //         {
    //             this.setState({user: data.data});
    //         }
    //         else
    //         {
    //             console.error(data.message);
    //         }
    //     }
    //     catch(error)
    //     {
    //         console.error("Error getting user: ", error);
    //     }

    //     this.refreshUserData();
    // }
    async componentDidMount() {
        await this.refreshUserData();
        this.checkFollowing();
    }


    async refreshUserData() {
        try {
            const res = await fetch(`/api/users/${this.state.userId}`);
            const data = await res.json();
            if (res.ok) {
                this.setState({ user: data.data });
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching user data: ", error);
        }
    }


    toggleModal = (modal) => {
        this.setState((prevState) => ({ [modal]: !prevState[modal] }));
    }

    editProfile()
    {
        this.setState({edit: true});
    }

    createPlaylist()
    {
        this.setState({playlist: true});
    }

    addSong()
    {
        this.setState({song: true});

    }

    // async handleFollow()
    // {
    //     try
    //     {
    //         const myId = localStorage.getItem('userId');
    //         const res = await fetch(`/api/users/add-follower/${this.state.userId}`, {
    //             method: 'PUT',
    //             body: JSON.stringify({followerId: parseInt(myId)})
    //         });
    //         const data = await res.json();

    //         if(res.ok)
    //         {
    //             this.setState({following: true});
    //         }
    //         else
    //         {
    //             console.error(data.message);
    //             window.alert("Could not Follow user");
    //         }
    //     }
    //     catch(error)
    //     {
    //         console.log("Error when following user: ", error);
    //         window.alert("Could not Follow user");
    //     }
    // }

    handleFollow = async () => {
        try {
            const myId = localStorage.getItem('userId');
            const res = await fetch(`/api/users/add-follower/${this.state.userId}`, {
                method: 'PUT',
                body: JSON.stringify({ followerId: parseInt(myId) }),
                headers: {
                    'Content-Type': 'application/json', // Make sure to set headers
                },
            });
            const data = await res.json();
    
            if (res.ok) {
                this.setState({ following: true });
            } else {
                console.error(data.message);
                window.alert("Could not Follow user");
            }
        } catch (error) {
            console.log("Error when following user: ", error);
            window.alert("Could not Follow user");
        }
    };

    checkFollowing()
    {
        // const {following, userId, user} = this.state;
        // const myId = localStorage.getItem('userId');
        // let flag = false;

        // for(let k = 0; k < user.followers.length; k ++)
        // {
        //     if(parseInt(user.followers[k]) === parseInt(myId))
        //     {
        //         flag = true;
        //         break;
        //     }
        // }

        // if(flag === true)
        // {
        //     this.setState({following: true});
        // }

        const { user } = this.state;
    const myId = parseInt(localStorage.getItem('userId'));

    if (user?.followers) {
        this.setState({ following: user.followers.includes(myId) });
    }
    }

    displayFollow() {
        if (this.state.following === true) {
            return <></>;
        }
        return <button onClick={this.handleFollow} className="bg-green-500 text-white py-2 px-4 rounded">Follow</button>;
    }
    
    displayUser() {
        const { user } = this.state;
    
        return (
            <div className="flex flex-col items-center text-center mt-8">
                <div className="flex flex-col items-center bg-cWhite rounded-md p-4">
                    <img 
                        src={user.profilePicture} 
                        alt="User's profile picture" 
                        title="User's profile picture" 
                        className="rounded-full w-36 h-36 mb-4" 
                    />
                    
                    <h1 className="text-2xl font-bold">{user.name} {user.surname}</h1>
    
                    <div className="flex justify-around w-full mt-4">
                        {/* Social Media Section */}
                        <div className="flex flex-col items-center">
                            <h3 className="text-lg font-semibold">Social Media</h3>
                            <div className="flex justify-center space-x-3 mt-2">
                                <a href={user.instagram} target="_blank">
                                    <img src={instagram} alt='Instagram Logo' title='Instagram Logo' className="w-8 h-8" />
                                </a>
                                <a href={user.facebook} target="_blank" >
                                    <img src={facebook} alt='Facebook Logo' title='Facebook Logo' className="w-8 h-8" />
                                </a>
                                <a href={user.tiktok} target="_blank" >
                                    <img src={tiktok} alt='Tiktok Logo' title='Tiktok Logo' className="w-8 h-8" />
                                </a>
                                <a href={user.twitter} target="_blank" >
                                    <img src={twitter} alt='Twitter Logo' title='Twitter Logo' className="w-8 h-8" />
                                </a>
                            </div>
                        </div>
    
                        {/* Bio Section */}
                        <div className="flex flex-col items-center mt-4">
                            <h3 className="text-lg font-semibold">Bio</h3>
                            <p className="mt-2">{user.bio}</p>
                        </div>
                    </div>
    
                    <div className="mt-6 flex justify-center space-x-4">
                        <button onClick={() => this.toggleModal('edit')} className="bg-blue-500 text-white py-2 px-4 rounded">Edit Profile</button>
                        <button onClick={() => this.toggleModal('playlist')} className="bg-blue-500 text-white py-2 px-4 rounded">Create Playlist!</button>
                        <button onClick={this.addSong} className="bg-blue-500 text-white py-2 px-4 rounded">Add Song!</button>
                        {this.displayFollow()}
                    </div>
                </div>
    
                {this.state.edit && <EditProfile onUpdate={this.refreshUserData} onClose={() => this.toggleModal('edit')} />}
                {this.state.playlist && <CreatePlaylist onClose={() => this.toggleModal('playlist')} />}
            </div>
        );
    }
    
    handlePlaylistCreated = () => {
        this.setState({ playlist: false });
        this.props.onPlaylistCreated();
    }
    
    render() {
        if (this.state.song) {
            const type = 's';
            return <Navigate to={`/AddSongPage/${this.state.userId}/${type}`} />;
        }
    
        return (
            <div className="flex justify-center">
                {this.displayUser()}
            </div>
        );
    }
}

export default ProfileComponent;