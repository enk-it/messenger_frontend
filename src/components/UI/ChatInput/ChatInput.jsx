import React, {useContext, useRef, useState} from 'react';
import classes from './ChatInput.module.css'
import send from './icons/send-message.png'
import {useFetching} from "../../../hooks/useFetching";
import PostService from "../../../API/PostService";
import {AuthContext} from "../../../context";
import Input from "../../new_UI/Input/Input";
import Button from "../../new_UI/Button/Button";
const ChatInput = ({chat}) => {

    const [message, setMessage] = useState('')

    const {isAuth, setIsAuth} = useContext(AuthContext)
    const {token, setToken} = useContext(AuthContext)

    const inputRef = useRef();


    const [fetchSendMessage, isLoading, error] = useFetching(async (token, chat_id, content) => {

        const response = await PostService.sendMessage(token, chat_id, content)
    })

    const onMessageSend = (e) => {
        e.preventDefault()
        if (message === ''){
            return
        }
        fetchSendMessage(token, chat.chat_id, message)
        setMessage('');
        inputRef.current.value = '';
    }


    return (
        <form onSubmit={onMessageSend} className={classes.chatContainer}>
            {/*<input ref={inputRef} contentEditable={'true'} onChange={(event) => {setMessage(event.target.value)}} placeholder={"Начните писать..."} className={classes.chatInput} type="text"></input>*/}

            <div className={classes.InputBack}>
                <Input styles={classes.chatInput} type="text" ref={inputRef} onChange={(event) => {
                    setMessage(event.target.value)
                }} placeholder={"Начните писать..."}></Input>

                <Button styles={classes.chatButtonSubmit}>
                    <img className={classes.chatButtonImg} src={send} alt=""/>

                </Button>


            </div>


        </form>
    );
};

export default ChatInput;