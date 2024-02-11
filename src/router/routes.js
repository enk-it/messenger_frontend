import Chats from "../pages/Chats";
import Users from "../pages/Users";
import Profile from "../pages/Profile";

import Welcome from "../pages/Welcome";

export const privateRoutes = [
    {key:1, path: '/chats', component: Chats, exact: true},
    {key:5, path: '/users', component: Users, exact: true},
    {key:7, path: '/profile', component: Profile, exact: true},
    {key:2, path: '/*', component: Chats, exact: true}

]

export const publicRoutes = [
    {key:6, path: '/', component: Welcome},

]