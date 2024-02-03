import React, {useCallback, useEffect, useState} from 'react';
import classes from './ChatBar.module.css'
import singleChat from "../ChatMiniature/ChatMiniature";
import MyInput from "../input/MyInput";
const ChatBar = ({chats, setCurrentChatId}) => {

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


            <div className={classes.containerInput}>
                <MyInput onChange={(e) => {setQuery(e.target.value)}}></MyInput>
            </div>
            <div className={classes.containerDiv}>
                {chats.map((chat) => {
                    return singleChat(chat, setCurrentChatId)
                })}
            </div>
        </div>
    );
};

export default ChatBar;