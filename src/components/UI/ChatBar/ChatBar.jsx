import React, {useCallback, useEffect, useState} from 'react';
import classes from './ChatBar.module.css'
import ChatMiniature from "../ChatMiniature/ChatMiniature";
import MyInput from "../input/MyInput";
import Input from "../../new_UI/Input/Input";
const ChatBar = ({chats, setCurrentChatId, chatId}) => {

    const backToChooseChat = useCallback((event) => {
        if (event.key === 'Escape') {
            setCurrentChatId(-1)
            // console.log(`Key pressed: ${event.key}`);
        }
    }, []);


    const [query, setQuery] = useState('')

    // const sqChats = useChats(chats, true, query)

    useEffect(() => {
        // attach the event listener
        document.addEventListener('keydown', backToChooseChat);

        // remove the event listener
        return () => {
            document.removeEventListener('keydown', backToChooseChat);
        };
    }, [backToChooseChat]);


    return (
        <div className={classes.chatBar}>

            <div className={classes.tempPlaceholder}>

            </div>
            <Input placeholder={'Search'} styles={classes.Input} onChange={(e) => {setQuery(e.target.value)}}></Input>

            <div className={classes.containerDiv}>
                {chats.map((chat) => {
                    return ChatMiniature(chat, setCurrentChatId, chatId)
                })}
            </div>
        </div>
    );
};

export default ChatBar;