import React, {useCallback, useEffect, useState, useRef, useContext} from 'react';
import classes from './ChatBar.module.css'
import ChatMiniature from "../ChatMiniature/ChatMiniature";
import Input from "../Input/Input";
import Button from "..//Button/Button";
import StartChatForm from "../StartChatForm/StartChatForm";
import {AuthContext} from "../../../context";

import {useChats} from "../../../hooks/useChats"

const ChatBar = ({chats, setCurrentChatId, chatId}) => {
    const ref = useRef(null);

    const {token, setToken} = useContext(AuthContext)
    const {isAuth, setIsAuth} = useContext(AuthContext)



    const [query, setQuery] = useState('');
    const [lookingForNewChat, setLookingForNewChat] = useState(false);


    const sortedAndFileteredChats = useChats(chats, query);

    const backToChooseChat = useCallback((event) => {
        if (event.key === 'Escape') {
            setCurrentChatId(-1)
            // console.log(`Key pressed: ${event.key}`);
        }
    }, []);


    useEffect(() => {

        // attach the event listener
        document.addEventListener('keydown', backToChooseChat);

        // remove the event listener
        return () => {
            document.removeEventListener('keydown', backToChooseChat);
        };
    }, []);


    const logout = () => {
        localStorage.setItem('auth', false)
        localStorage.setItem('token', '')
        setToken('')
        setIsAuth(false)

    }



    return (

        <div className={classes.chatBar} onClick={(e) => {setCurrentChatId(-1)}} >

            <div className={classes.placeholder} onClick={(e) => {e.stopPropagation()}}>

                <Input placeholder={'Search'} styles={classes.Input} onChange={(e) => {setQuery(e.target.value)}}></Input>
                <Button styles={classes.newChatButton} onClick={() => {setLookingForNewChat(true)}}>
                    <img className={classes.addImg} alt={''} src={'https://messenger.gladyshdd.ru/api/share/avatar/add.png'}/>
                </Button>
                <Button styles={classes.newChatButton} onClick={() => {logout()}}>
                    Logout
                </Button>

            </div>

            <div className={classes.containerDiv}>
                {
                    sortedAndFileteredChats.map((chat) => {
                    return <ChatMiniature chat={chat} setCurrentChatId={setCurrentChatId} chatId={chatId} />
                    })
                }
            </div>
            
            <StartChatForm state={lookingForNewChat} setState={setLookingForNewChat}/>
            

        </div>
    );
};

export default ChatBar;