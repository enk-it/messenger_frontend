import React, {useCallback, useEffect, useState} from 'react';
import classes from './ChatBar.module.css'
import ChatMiniature from "../ChatMiniature/ChatMiniature";
import Input from "../../new_UI/Input/Input";
import Button from "../../new_UI/Button/Button";
import StartChatForm from "../../new_UI/StartChatForm/StartChatForm";

import {useChats} from "../../../hooks/useChats"

const ChatBar = ({chats, setCurrentChatId, chatId}) => {


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
    }, [backToChooseChat]);



    const findNewChat = (e) => {
        console.log(e)
    }


    return (

        <div className={classes.chatBar} onClick={(e) => {setCurrentChatId(-1)}}>

            <div className={classes.placeholder} onClick={(e) => {e.stopPropagation()}}>

                <Input placeholder={'Search'} styles={classes.Input} onChange={(e) => {setQuery(e.target.value)}}></Input>
                <Button styles={classes.newChatButton} onClick={() => {setLookingForNewChat(true)}}>
                    <img className={classes.addImg} alt={''} src={'http://192.168.0.12:8000/share/avatar/add.png'}/>
                </Button>    

            </div>

            <div className={classes.containerDiv}>
                {sortedAndFileteredChats.map((chat) => {
                    return <ChatMiniature chat={chat} setCurrentChatId={setCurrentChatId} chatId={chatId}/>
                })}
            </div>
            
            <StartChatForm state={lookingForNewChat} setState={setLookingForNewChat}/>
            

        </div>
    );
};

export default ChatBar;