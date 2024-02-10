import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../context";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import UsersList from "../components/UI/UsersList/UsersList";



const Users = () => {

    const {token, setToken} = useContext(AuthContext)

    const [users, setUsers] = useState([])

    const [fetchUsers, isUsersLoading, usersError] = useFetching(async (token) => {

        // console.log(token, 'That is the token i m trying to auth')

        const response = await PostService.getUsers(token)

        setUsers(response.data.users)

    })

    const [fetchStartChat, isLoading, error] = useFetching(async (token, user_id) => {

        const response = await PostService.startChat(token, user_id)
        if (response.data.status !== 200){
            alert(response.data.detail)
        }
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