import React, {useContext, useEffect, useState} from 'react';
import classes from './ChatView.module.css'
import ChatHeader from "../ChatHeader/ChatHeader";
import ChatMessages from "../ChatMessages/ChatMessages";
import ChatInput from "../ChatInput/ChatInput";
import {AuthContext} from "../../../context";

const ChatView = ({chat}) => {

    const {isAuth, setIsAuth} = useContext(AuthContext)
    const {token, setToken} = useContext(AuthContext)

    const renderChats = () => {
        if (chat === null || chat === undefined){
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