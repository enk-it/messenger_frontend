import React from 'react';
import classes from './ChatHeader.module.css'
const ChatHeader = ({title}) => {


    return (
        <div className={classes.chatHeader}>
            <div>{title}</div>
        </div>
    );
};

export default ChatHeader;