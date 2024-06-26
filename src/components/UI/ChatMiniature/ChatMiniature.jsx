import React, {useContext, useEffect, useState, useRef, useCallback} from 'react';
import classes from "./ChatMiniature.module.css";
import {AuthContext} from "../../../context";
import {useUsers} from "../../../hooks/useUsers"


const ChatMiniature = ({chat, setCurrentChatId, chatId}) => {

    


    const getLastMessageText = (chat) => {

        let prefix = ''

        if (chat !== null && chat.messages.length !== 0){
            if (chat.messages[0].incoming === false) {
                prefix = 'You: '
            }
            return prefix + chat.messages[0].content
        }

        return 'Empty chat'
    }

    const getLastMessageTime = (chat) => {
        if (chat !== null && chat.messages.length !== 0){
            return chat.messages[0].datetime
        }
        return ''
    }

    const indicatorStyles = (chat) => {
        if (chat.messages.length !==0 && chat.messages[0].incoming && (chat.messages[0].is_read === false)){
            return classes.read_indicator
        }
        return classes.hidden_element
    }


    const getReadableDate = (timestamp) => {
        return new Intl.DateTimeFormat('ru-RU', {hour: '2-digit', minute: '2-digit'}).format(timestamp * 1000)
    }

    const getCurrentStyle = () => {
        if (chat.chat_id === chatId){
            return classes.singleChatActive
        }
        return classes.singleChat
    }   


    const chatChoosen = event => {
        event.stopPropagation()
        setCurrentChatId(chat.chat_id)

        
    }



    return (
        <div  className={getCurrentStyle()} onClick={chatChoosen}>
            <div className={classes.pictureBackground}>
                <img alt={''} src={'https://messenger.gladyshdd.ru/api/share/avatar/' + chat.avatar_url} className={classes.avatar}></img>
            </div>

            <div className={classes.textData}>
                <div className={classes.chatData}>
                    <div className={classes.name}>
                        {chat.title}
                    </div>
                    <div className={indicatorStyles(chat)}></div>
                </div>
                

                <div className={classes.userData}>
                    <div className={classes.userText}>{getLastMessageText(chat)}</div>
                    <div className={classes.userTime}>{getReadableDate(getLastMessageTime(chat))}</div>
                </div>
            </div>

        </div>
    );
};

export default ChatMiniature;