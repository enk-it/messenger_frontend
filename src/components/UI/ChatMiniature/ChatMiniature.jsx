import React from 'react';
import classes from "./ChatMiniature.module.css";

const ChatMiniature = (chat, setCurrentChatId) => {

    const getLastMessageText = (chat) => {
        if (chat !== null && chat.messages.length !== 0){
            return chat.messages[0].content
        }
        return ''
    }

    const getLastMessageTime = (chat) => {
        if (chat !== null && chat.messages.length !== 0){
            return chat.messages[0].datetime
        }
        return ''
    }


    const getReadableDate = (timestamp) => {
        return new Intl.DateTimeFormat('ru-RU', {hour: '2-digit', minute: '2-digit'}).format(timestamp * 1000)
    }



    return (
        <div className={classes.singleChat} onClick={() => {console.log(chat); setCurrentChatId(chat.chat_id)}}>
            <div className={classes.pictureBackground}>
                <img alt={''} src={'http://192.168.0.12:8000/share/avatar/' + chat.avatar_url} className={classes.avatar}></img>
            </div>

            <div className={classes.textData}>
                <div className={classes.name}>
                    {chat.title}
                </div>
                <div className={classes.subMessage}>
                    <div className={classes.userText}>{getLastMessageText(chat)}</div>
                    <div className={classes.userTime}>{getReadableDate(getLastMessageTime(chat))}</div>
                </div>
            </div>

        </div>
    );
};

export default ChatMiniature;