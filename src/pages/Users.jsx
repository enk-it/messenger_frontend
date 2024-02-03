import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {AuthContext} from "../context";
import ChatBar from "../components/UI/ChatBar/ChatBar";
import ChatView from "../components/UI/ChatView/ChatView";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import {getTicks} from "../utils/ticks";
import UsersList from "../components/UI/UsersList/UsersList";



const Users = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext)
    const {token, setToken} = useContext(AuthContext)

    const [users, setUsers] = useState([])

    const [fetchUsers, isUsersLoading, usersError] = useFetching(async (token) => {

        // console.log(token, 'That is the token i m trying to auth')

        const response = await PostService.getUsers(token)

        setUsers(response.data.users)

    })

    const [fetchStartChat, isLoading, error] = useFetching(async (token, user_id) => {

        const response = await PostService.startChat(token, user_id)
    })


    const startChat = (user_id) => {
        fetchStartChat(token, user_id)
    }


    useEffect(() => {
        fetchUsers(token)
    }, [])


    return (
        <div>
            <UsersList users={users} startChat={startChat}/>
        </div>
    );
};

export default Users;