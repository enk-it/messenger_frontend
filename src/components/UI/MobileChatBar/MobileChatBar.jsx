import React, {useCallback, useEffect, useState, useRef} from 'react';
import classes from './MobileChatBar.module.css'
import ChatMiniature from "../ChatMiniature/ChatMiniature";
import Input from "../Input/Input";
import Button from "..//Button/Button";
import StartChatForm from "../StartChatForm/StartChatForm";

import {useChats} from "../../../hooks/useChats"

const MobileChatBar = ({chats, setCurrentChatId, chatId}) => {
    const ref = useRef(null);


    const [query, setQuery] = useState('');
    const [lookingForNewChat, setLookingForNewChat] = useState(false);


    const sortedAndFileteredChats = useChats(chats, query);


    return (

        <div className={classes.chatBar} onClick={(e) => {setCurrentChatId(-1)}} >

            <div className={classes.placeholder} onClick={(e) => {e.stopPropagation()}}>

                <Input placeholder={'Search'} styles={classes.Input} onChange={(e) => {setQuery(e.target.value)}}></Input>
                <Button styles={classes.newChatButton} onClick={() => {setLookingForNewChat(true)}}>
                    <img className={classes.addImg} alt={''} src={'https://messenger.gladyshdd.ru/api/share/avatar/add.png'}/>
                </Button>    

            </div>

            <div className={classes.containerDiv}>
                {
                    sortedAndFileteredChats.map((chat) => {
                    return <ChatMiniature chat={chat} setCurrentChatId={setCurrentChatId} chatId={chatId} />
                    })
                }
            </div>
            
            <StartChatForm state={lookingForNewChat} setState={setLookingForNewChat}/>
            

        </div>
    );
};

export default MobileChatBar;