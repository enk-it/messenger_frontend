import React, {useContext, useEffect, useRef} from 'react';
import classes from './ChatMessages.module.css'
import {AuthContext} from "../../../context";

import Message from "../Message/Message";

const ChatMessages = ({messages, loadOldestMessages}) => {
    let messagesToRender = []

    const getReadableDate = (timestamp) => {
        // return new Intl.DateTimeFormat('ru-RU', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp * 1000)
        return new Intl.DateTimeFormat('ru-RU', {hour: '2-digit', minute: '2-digit'}).format(timestamp * 1000)
    }

    const renderMessages = () => {
            for (let i = messages.length - 1; i >= 0 ; i--){
                messagesToRender.push(<Message content={messages[i].content} datetime={messages[i].datetime} incoming={messages[i].incoming} is_read={messages[i].is_read}/>);
            }

            return messagesToRender
    }

    const observer = useRef(null)
    const divRef = useRef(null);
    const divRefEnd = useRef(null);


    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        observer.current = new IntersectionObserver((entries, obs) => {
            // console.log('Im visible', entries)
            if (entries[0].isIntersecting === true){
                loadOldestMessages()
            }
        });
        observer.current.observe(divRefEnd.current)
    }, [])


    return (
        <div className={classes.chatScroller}>
            <div style={{padding: 15}} ref={divRefEnd}/>
            {renderMessages()}
            <div ref={divRef}/>
        </div>
    );
};

export default ChatMessages;