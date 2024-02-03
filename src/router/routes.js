import Chats from "../pages/Chats";
import Login from "../pages/Login";
import Users from "../pages/Users";

import Register from "../pages/Register";

export const privateRoutes = [
    {key:1, path: '/chats', component: Chats, exact: true},
    {key:5, path: '/users', component: Users, exact: true},
    {key:2, path: '/*', component: Chats, exact: true}

]

export const publicRoutes = [
    {key:3, path: '/register', component: Register, exact: true},
    {key:4, path: '/login', component: Login, exact: true},

]