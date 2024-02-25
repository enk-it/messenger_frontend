import React, {useContext, useRef, useState} from 'react';
import classes from './AuthForm.module.css'
import Input from "../Input/Input";
import Button from "../Button/Button";
import {AuthContext} from "../../../context";
import {useFetching} from "../../../hooks/useFetching";
import PostService from "../../../API/PostService";
import Loader from "../Loader/Loader";

const AuthForm = () => {

    const [lastError, setError] = useState('')

    const [registration, setRegistration] = useState(false)

    const usernameField = useRef(null)
    const passwordField = useRef(null)


    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const {isAuth, setIsAuth} = useContext(AuthContext)
    const {token, setToken} = useContext(AuthContext)
    const {userId, setUserId} = useContext(AuthContext)

    const callbackLogin = async (username, password, client_id) => {
        try{
            const response = await PostService.login(username, password, client_id)

            setUserId(response.data.user_id);
            setToken(response.data.token);
            setIsAuth(true);   
        }
        catch (e){
            if (e.code === "ERR_NETWORK"){
                setError('Network error. Check your Internet Connetion')
            }
            else{
                // console.log(e)
                setError(e.response.data.detail)
            }
        }
    }

    const callbackRegister = async (username, password, client_id) => {
        try{

            const response = await PostService.register(username, password, client_id)

            setUserId(response.data.user_id);
            setToken(response.data.token);
            setIsAuth(true);
        }
        catch (e){
            if (e.code === "ERR_NETWORK"){
                setError('Network error. Check your Internet Connetion')
            }
            else{
                // console.log(e)
                setError(e.response.data.detail)
            }
        }
    }


    const [fetchLogin, isLoadingLogin] = useFetching(callbackLogin, setError)
    const [fetchRegister, isLoadingRegister] = useFetching(callbackRegister, setError)


    const subForm = () => {
        return <div className={classes.inputContainer}>
            {
                registration
                    ?
                    <h1 >{"Register"}</h1>
                    :
                    <h1 >{"LogIn"}</h1>
            }
            <Input ref={usernameField} onChange={(e) => setUsername(e.target.value)} styles={classes.input} placeholder={'Username'}></Input>
            <Input ref={passwordField} onChange={(e) => setPassword(e.target.value)} styles={classes.input} type={'Password'} placeholder={'Password'}></Input>
            <Button styles={classes.button} >{'Submit'}</Button>

            {
                isLoadingLogin || isLoadingRegister
                    ?
                    <Loader></Loader>
                    :
                    <div className={classes.errorfield}>
                        {lastError}
                    </div>
            }
        </div>
    }

    const clearFields = () => {
        usernameField.current.value = '';
        passwordField.current.value = '';
        setPassword('');
        setUsername('');
    }


    const submit = (event) => {
        event.preventDefault()

        if (username === ''){
            setError('Username field can not be empty')
            return
        }
        if (password === ''){
            setError('Password field can not be empty')
            return
        }

        if (registration){
            fetchRegister(username, password, 'test_device')
        }
        else {
            fetchLogin(username, password, 'test_device')
        }
    }


    return (
        <form onSubmit={submit} className={classes.container}>
            <div className={classes.chooseContainer}>
                <div onClick={() => {if (!registration) return; setRegistration(false); clearFields()}} className={{true: classes.options,false: classes.options_tinted}[registration]}>{'Login'}</div>
                <div onClick={() => {if (registration) return; setRegistration(true); clearFields()}} className={{true: classes.options,false: classes.options_tinted}[!registration]}>{'Register'}</div>
            </div>
            {subForm()}


        </form>
    );
};

export default AuthForm;