import React, {useContext, useEffect, useState} from 'react';
import classes from './ChatView.module.css'
import ChatHeader from "../ChatHeader/ChatHeader";
import ChatMessages from "../ChatMessages/ChatMessages";
import ChatInput from "../ChatInput/ChatInput";
import {AuthContext} from "../../../context";

const ChatView = ({chats, chatId}) => {

    const {isAuth, setIsAuth} = useContext(AuthContext)
    const {token, setToken} = useContext(AuthContext)

    const [chat, setChat] = useState(null)

    useEffect(() => {
        for (let i = 0; i < chats.length; i++){
            if (chats[i].chat_id === chatId){
                setChat(chats[i])
            }
        }
    }, [chatId])



    const renderChats = () => {
        console.log(chatId, chat, 'xfn')
        if (chatId === -1 || chat === null || chat === undefined){
            return <div className={classes.chat}>
                <ChatHeader title={'No chat selected'}/>
            </div>
        }
        else{
            return <div className={classes.chat}>
                <ChatHeader title={chat.title}/>
                <ChatMessages chat={chat}/>
                <ChatInput chat={chat}/>
            </div>
        }
    }

    return (
        renderChats()
    );
};

export default ChatView;