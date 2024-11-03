import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import PlaylistFeedPage from './pages/PlaylistFeedPage'; 
import PlaylistPage from './pages/PlaylistPage';
import ProfilePage from './pages/ProfilePage';
import RegisterPage from './pages/RegisterPage';
import SongFeedPage from './pages/SongFeedPage';
import SplashPage from'./pages/SplashPage';
import AddSongPage from './pages/AddSongPage';
import FriendsPage from './pages/FriendsPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <SplashPage/>
    },
    {
        path: '/LoginPage',
        element: <LoginPage/>
    },
    {
        path: '/RegisterPage',
        element: <RegisterPage/>
    },
    {
        path: '/Home',
        element: <Home/>
    },
    {
        path: '/PlaylistFeedPage/:type',
        element: <PlaylistFeedPage/>
    },
    {
        path: '/PlaylistPage/:playlistId',
        element: <PlaylistPage/>
    },
    {
        path: '/SongFeedPage/:type',
        element: <SongFeedPage/>
    },
    {
        path: '/ProfilePage/:userId',
        element: <ProfilePage/>
    },
    {
        path: '/AddSongPage/:id/:type',
        element: <AddSongPage/>
    },
    {
        path: '/FriendsPage/:type',
        element: <FriendsPage/>
    },
]);

class App extends React.Component
{
    render()
    {
        return(
            <RouterProvider router={router}/>
        );
    }
}

export default App;
