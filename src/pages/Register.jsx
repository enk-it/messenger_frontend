import React, {useContext, useState} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {AuthContext} from "../context";
import PostService from "../API/PostService";
import {useFetching} from "../hooks/useFetching";

const Register = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext)
    const {userId, setUserId} = useContext(AuthContext)
    const {token, setToken} = useContext(AuthContext)

    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [fetchRegister, isLoading, error] = useFetching(async (username, password, client_id) => {
        const response = await PostService.tryRegister(username, password, client_id)

        console.log(response)

        setUserId(response.data.user_id);
        setToken(response.data.token);
        setIsAuth(true);

    })

    const register = event => {
        event.preventDefault()
        if (username !== '' && password !== '') {
            fetchRegister(username, password, 'asd')
        }
        else {
            alert('Check validity of data')
        }
    }

    return (
        <div>
            <h1>Register page</h1>
            <form onSubmit={register}>

                <MyInput type="text" placeholder="Input ur username" onChange={e => {setUsername(e.target.value)}}/>
                <MyInput type="password" placeholder="Input ur password" onChange={e => {setPassword(e.target.value)}}/>
                <MyButton> Submit</MyButton>
            </form>
        </div>
    );
};

export default Register;