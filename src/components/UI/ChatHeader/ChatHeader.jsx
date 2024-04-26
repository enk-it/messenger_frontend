import React from 'react';
import classes from './ChatHeader.module.css'
import Button from "..//Button/Button";

const ChatHeader = ({setCurrentChatId, title}) => {


    return (
        <div className={classes.chatHeader}>
            {
                setCurrentChatId !== null
                ?
                <Button styles={classes.backButton} onClick={() => {setCurrentChatId(-1)}}>
                    <img className={classes.backButton} alt={''} src={'https://messenger.gladyshdd.ru/api/share/avatar/back.png'}/>
                </Button>
                :
                <div></div>  
            }
              
            <div className={classes.title}>{title}</div>
        </div>
    );
};

export default ChatHeader;