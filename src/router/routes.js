import {Navigate} from "react-router-dom";

import Chats from "../pages/Chats";
import Users from "../pages/Users";
import Profile from "../pages/Profile";
import Error from "../pages/Error";

import Welcome from "../pages/Welcome";

export const privateRoutes = [
    {key:1, path: '/chats', component: <Chats/>, exact: true},
    {key:5, path: '/users', component: <Users/>, exact: true},
    {key:7, path: '/profile', component: <Profile/>, exact: true},
    {key:7, path: '/error', component: <Error/>, exact: true},
    {key:2, path: '*', component: <Navigate to="/chats" replace />, exact: true}
]

export const publicRoutes = [
    {key:6, path: '/', component: <Welcome/>},
    {key:6, path: '/error', component: <Error/>},
    {key:2, path: '*', component:<Navigate to="/" replace />, exact: true}
]