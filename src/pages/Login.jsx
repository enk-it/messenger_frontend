import React, {useContext, useState} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {AuthContext} from "../context";
import PostService from "../API/PostService";
import {useFetching} from "../hooks/useFetching";
import ChatBar from "../components/UI/ChatBar/ChatBar";
import ChatHeader from "../components/UI/ChatHeader/ChatHeader";

const Login = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext)
    const {token, setToken} = useContext(AuthContext)
    const {userId, setUserId} = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [fetchLogin, isLoading, error] = useFetching(async (email, password) => {
        const response = await PostService.tryLogin(email, password)

        setUserId(response.data.user_id);
        setToken(response.data.token);
        setIsAuth(true);



    })

    const login = event => {
        event.preventDefault()
        fetchLogin(email, password)
        console.log(error)
    }

    return (
        <div>
            <h1>LogIn page</h1>
            <form onSubmit={login}>

                <MyInput type="text" placeholder="Input ur e-mail" onChange={e => {setEmail(e.target.value)}}/>
                <MyInput type="password" placeholder="Input ur password" onChange={e => {setPassword(e.target.value)}}/>
                <MyButton> Submit</MyButton>
                {error ? <ChatHeader title={'Wrong login or/and password'}></ChatHeader> : (<p></p>) }
            </form>
        </div>
    );
};

export default Login;