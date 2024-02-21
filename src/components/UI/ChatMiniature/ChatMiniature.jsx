import React from 'react';
import classes from "./ChatMiniature.module.css";

const ChatMiniature = (chat, setCurrentChatId, chatId) => {

    const getLastMessageText = (chat) => {

        let prefix = ''

        if (chat.messages[0].incoming === false){
            prefix = 'You: '
        }

        console.log(prefix)

        if (chat !== null && chat.messages.length !== 0){
            return prefix + chat.messages[0].content
        }
        return ''
    }

    const getLastMessageTime = (chat) => {
        if (chat !== null && chat.messages.length !== 0){
            return chat.messages[0].datetime
        }
        return ''
    }

    const indicatorStyles = (chat) => {
        if (chat.messages[0].incoming && (chat.messages[0].is_read === false)){
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



    return (
        <div className={getCurrentStyle()} onClick={() => {setCurrentChatId(chat.chat_id)}}>
            <div className={classes.pictureBackground}>
                <img alt={''} src={'http://192.168.0.12:8000/share/avatar/' + chat.avatar_url} className={classes.avatar}></img>
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