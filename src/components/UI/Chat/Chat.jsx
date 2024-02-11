
import classes from './Chat.module.css'
import ChatBar from "../ChatBar/ChatBar";
import ChatView from "../ChatView/ChatView";
import React from "react";

const Chat = ({chats, currentChatId, setCurrentChatId}) => {


    return (
        <div className={classes.container}>
            <div className={classes.chat}>
                <ChatBar chats={chats} setCurrentChatId={setCurrentChatId}/>
                <ChatView chats={chats} chatId={currentChatId}/>
            </div>
        </div>

    );
};

export default Chat;