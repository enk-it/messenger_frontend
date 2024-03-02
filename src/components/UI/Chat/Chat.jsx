import classes from './Chat.module.css'
import ChatBar from "../ChatBar/ChatBar";
import ChatView from "../ChatView/ChatView";
import React, {useContext, useEffect, useState} from "react";

const Chat = ({chats, currentChatId, setCurrentChatId}) => {

    const [currentChat, setCurrentChat] = useState(null)

    useEffect(() => {
        if (currentChatId === -1){
            setCurrentChat(null)
        }
        for (let i = 0; i < chats.length; i++){
            if (chats[i].chat_id === currentChatId){
                setCurrentChat(chats[i])
            }
        }
    }, [currentChatId])


    return (
        <div className={classes.container}>
            <div className={classes.chat}>
                <ChatBar chats={chats} setCurrentChatId={setCurrentChatId} chatId={currentChatId}/>
                <ChatView chat={currentChat} setCurrentChatId={setCurrentChatId}/>
            </div>
        </div>

    );
};

export default Chat;