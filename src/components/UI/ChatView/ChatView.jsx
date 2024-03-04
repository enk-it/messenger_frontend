import React, {useContext, useEffect, useState} from 'react';
import classes from './ChatView.module.css'
import ChatHeader from "../ChatHeader/ChatHeader";
import ChatMessages from "../ChatMessages/ChatMessages";
import ChatInput from "../ChatInput/ChatInput";
import {AuthContext} from "../../../context";
import {useFetching} from "../../../hooks/useFetching";
import PostService from "../../../API/PostService";

const ChatView = ({chat, setCurrentChatId, loadOldestMessages}) => {

    const {isAuth, setIsAuth} = useContext(AuthContext)
    const {token, setToken} = useContext(AuthContext)

    const [fetchReadMessage, isLoading, error] = useFetching(async (token, chatId, messagesIds, usersIds) => {
        try{
            const response = await PostService.readMessage(token, chatId, messagesIds, usersIds)
            if (response.status !== 200){
                alert(response.data.detail)
            }
        }
        catch (e){
            if (e.code === "ERR_NETWORK"){
                alert('Network error. Check your Internet Connetion')
            }
        }
    })


    //todo realise new fetching older messages.

    const messagesRead = () => {
        if (chat === null){
            return
        }

        let unreadMessages = []
        let messagesOwnersIds = []

        for (let i = 0; i < chat.messages.length; i++){
            let message = chat.messages[i]
            if (message.incoming && !message.is_read) {
                unreadMessages.push(message.message_id)
                messagesOwnersIds.push(message.user_id)
                
            }
        }
        //console.log('Текущие непрочитанные соощбения: ', chat.chat_id, unreadMessages)
        if (unreadMessages.length !== 0){
            fetchReadMessage(token, chat.chat_id, unreadMessages, messagesOwnersIds)
        }
    }


    const depMsgOrNull = (chat) => {
        if (chat === null) {
            return null
        }
        if (chat.messages.length === 0){
            return null
        }
        else{
            return chat.messages[0]
        }
    }


    useEffect(messagesRead, [depMsgOrNull(chat)])

    const renderChats = () => {
        if (chat === null || chat === undefined){
            return <div className={classes.chat}>
                <ChatHeader setCurrentChatId={null} title={'No chat selected'}/>
            </div>
        }
        else{
            return <div className={classes.chat}>
                <ChatHeader setCurrentChatId={setCurrentChatId} title={chat.title}/>
                <ChatMessages messages={chat.messages} loadOldestMessages={loadOldestMessages}/>
                <ChatInput chat={chat}/>
            </div>
        }
    }

    return (
        renderChats()
    );
};

export default ChatView;