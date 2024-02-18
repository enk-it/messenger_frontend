import React, {useContext, useEffect, useRef} from 'react';
import classes from './ChatMessages.module.css'
import {AuthContext} from "../../../context";

import Message from "../../new_UI/Message/Message";

const ChatMessages = ({chat}) => {


    const getReadableDate = (timestamp) => {
        // return new Intl.DateTimeFormat('ru-RU', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp * 1000)
        return new Intl.DateTimeFormat('ru-RU', {hour: '2-digit', minute: '2-digit'}).format(timestamp * 1000)
    }


    const renderMessages = () => {
    let messages = []
            for (let i = chat.messages.length - 1; i >= 0 ; i--){
                messages.push(<Message content={chat.messages[i].content} datetime={chat.messages[i].datetime} incoming={chat.messages[i].incoming} is_read={false}/>);
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