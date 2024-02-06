import React, {useContext, useEffect, useRef, useState} from 'react';
import classes from './ChatMessages.module.css'
import {useFetching} from "../../../hooks/useFetching";
import PostService from "../../../API/PostService";
import {AuthContext} from "../../../context";
import {getTicks} from "../../../utils/ticks";
const ChatMessages = ({chat}) => {

    const {userId, setUserId} = useContext(AuthContext);


    const getReadableDate = (timestamp) => {
        // return new Intl.DateTimeFormat('ru-RU', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp * 1000)
        return new Intl.DateTimeFormat('ru-RU', {hour: '2-digit', minute: '2-digit'}).format(timestamp * 1000)
    }

    const renderMessages = () => {
        let messages = []

        for (let i = chat.messages.length - 1; i >= 0 ; i--){
            if (chat.messages[i].incoming === true){
                messages.push(
                    <div className={classes.messagePlaceholderRight}>
                        <div className={classes.singleMessage}>
                            <div>
                                {chat.messages[i].content}
                            </div>
                            <div className={classes.messageTime}>
                                {getReadableDate(chat.messages[i].datetime)}
                            </div>
                        </div>
                    </div>
                )
            }
            else{
                messages.push(
                    <div className={classes.messagePlaceholderLeft}>
                        <div className={classes.singleMessage}>
                            <div>
                                {chat.messages[i].content}
                            </div>
                            <div className={classes.messageTime}>
                                {getReadableDate(chat.messages[i].datetime)}
                            </div>
                        </div>
                    </div>
                )
            }

        }

        return messages
    }


    const divRef = useRef(null);

    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: 'smooth' });
    });


    return (
        <div className={classes.chatScroller}>
            {renderMessages()}
            <div ref={divRef}/>
        </div>
    );
};

export default ChatMessages;