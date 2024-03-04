import classes from './Chat.module.css'
import ChatBar from "../ChatBar/ChatBar";
import ChatView from "../ChatView/ChatView";
import React, {useContext, useEffect, useState} from "react";

const Chat = ({chats, currentChatId, setCurrentChatId, loadOldestMessages}) => {

    // const [currentChat, setCurrentChat] = useState(null)


    const getCurrentChat = () => {
        if (currentChatId === -1){
            return null
        }
        for (let i = 0; i < chats.length; i++){
            if (chats[i].chat_id === currentChatId){
                return chats[i]
            }
        }
    }

    // useEffect(() => {
    //     if (currentChatId === -1){
    //         setCurrentChat(null)
    //     }
    //     for (let i = 0; i < chats.length; i++){
    //         if (chats[i].chat_id === currentChatId){
    //             setCurrentChat(chats[i])
    //         }
    //     }
    // }, [currentChatId])


    return (
        <div className={classes.container}>
            <div className={classes.chat}>
                <ChatBar chats={chats} setCurrentChatId={setCurrentChatId} chatId={currentChatId}/>
                <ChatView chat={getCurrentChat()} setCurrentChatId={setCurrentChatId} loadOldestMessages={loadOldestMessages}/>
            </div>
        </div>

    );
};

export default Chat;