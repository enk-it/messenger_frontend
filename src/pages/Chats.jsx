import React, {useContext, useEffect, useRef, useState} from 'react';
import {AuthContext} from "../context";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Chat from "../components/UI/Chat/Chat";
import MobileChat from "../components/UI/MobileChat/MobileChat";

//const server_path = 'ws://192.168.0.12:8000/' //debug
const server_path = 'wss://messenger.enkit.ru:443/api_ws/' //production
// const server_path = 'ws://192.168.0.17:8000/' //production


const Chats = () => {
    const detectMobile = () => {
        let x = window.innerWidth;
        let y = window.innerHeight;
        let ratio = x / y
        if (ratio < 0.65){
            return true
        }
        else{
            return false
        }
    }

    const {token, setToken} = useContext(AuthContext)

    const [ws, setWs] = useState(null)

    const [chats, setChats] = useState([])

    const [currentChatId, setCurrentChatId] = useState(-1);

    const [messageRead, setMessageRead] = useState(null)
    const [newMessage, setNewMessage] = useState(null)
    const [oldMessages, setOldMessages] = useState(null)
    const [newChat, setNewChat] = useState(null)

    const [isMobile, setIsMobile] = useState(detectMobile())


    const [fetchChats, isChatsLoading, chatsError] = useFetching(async (token) => {
        const response = await PostService.getChats(token)

        let backend_chats = response.data.chats

        backend_chats.sort(
            (m1, m2) => {
                return m1.chat_id - m2.chat_id;
            }
        )
        setChats(backend_chats);
    })


    const [fetchOlderMessages, isOlderMessagesLoading, olderMessagesError] = useFetching(async (token, chat_id, message_id) => {
        const response = await PostService.getOlderMessages(token, chat_id, message_id)

        let olderMessages = response.data.messages

        //console.log(olderMessages, 'older messages from backend')
        if (olderMessages.length !== 0) {
            setOldMessages(olderMessages)
        }

    })



    const establishWebSocket = () => {
        if (ws === null){
            setWs(new WebSocket(server_path + "websocket_connection/")); // создаем ws соединение
            // console.log('WebSocket Connected')
        }
    }

    const updateMessagesOnRead = () => {
        if (messageRead === null){
            return
        }
        
        let newChats = []
        let changedChat = null

        for (let i = 0; i < chats.length; i++) {
            if (chats[i].chat_id == messageRead.chatId){
                changedChat = chats[i]
            }
            else{
                newChats.push(chats[i])
            }
        }

        if (changedChat.messages.length === 0){
            return
        }


        for (let j = 0; j < changedChat.messages.length; j++){
            if (messageRead.messagesIds.includes(changedChat.messages[j].message_id)){
                changedChat.messages[j].is_read = true
            }
        }

        newChats = [changedChat,...newChats]

        setChats(newChats)
        
    }


    const updateChatOnNewMessage = () => {
        if (chats.length === 0 || newMessage===null){
            return
        }

        let newChats = []


        for (let i = 0; i < chats.length; i++){
            const updatedChat = chats[i]

            if (chats[i].chat_id === newMessage.chat_id){
                updatedChat.messages.unshift(newMessage)
            }
            newChats = [updatedChat,...newChats]
        }

        newChats.sort(
            (m1, m2) => {
                return m1.chat_id - m2.chat_id;
            }
        )

        setChats(newChats)
    }


    const updateMessages = () => {
        if (chats.length === 0 || oldMessages===null){
            return
        }

        let newChats = []


        for (let i = 0; i < chats.length; i++){
            const updatedChat = chats[i]

            if (chats[i].chat_id === oldMessages[0].chat_id){
                updatedChat.messages = [...updatedChat.messages, ...oldMessages]
            }
            newChats = [updatedChat,...newChats]
        }

        newChats.sort(
            (m1, m2) => {
                return m1.chat_id - m2.chat_id;
            }
        )


        //console.log(newChats, 'new chats')

        setChats(newChats)
    }


    const updateChat = () => {
        if (newChat===null){
            // console.log(newChat)
            // console.log(chats)
            return
        }

        setChats([newChat,...chats])
    }


    const loadOldestMessages = () => {

        console.log('I was wrote from callback')

        let lastMessageId = -1

        for (let i = 0; i < chats.length; i ++) {
            if (chats[i].chat_id !== currentChatId){
                continue
            }
            if (chats[i].messages.length === 0){
                return
            }
            lastMessageId = chats[i].messages[chats[i].messages.length - 1].message_id

        }

        fetchOlderMessages(token, currentChatId, lastMessageId)
        //todo
    }



    const gettingData = () => {
        if (!ws) return;

        ws.onclose = () => {setWs(null);}
        ws.onmessage = e => {                //подписка на получение данных по вебсокету
            const message = e.data

            const parsed_message = JSON.parse(message)

            const errors = ['Auth failed. Check your Authorization data', 'Fake token', 'Your token is disabled']
            if (parsed_message.info === "Provide your Bearer token"){
                ws.send('Bearer ' + token)
            }
            else if (parsed_message.info === "Auth succeeded"){
                // console.log('WebSocket auth succeeded')
            }
            else if (errors.includes(parsed_message.info)){
                // console.log(parsed_message.info)
            }
            else if (parsed_message.info === "newMessage"){
                const new_message = parsed_message.message
                setNewMessage(new_message)
            }
            else if (parsed_message.info === "newChat"){
                const new_chat = parsed_message.chat
                setNewChat(new_chat)
            }
            else if (parsed_message.info === "messagesRead"){
                const readData = {chatId: parsed_message.chat_id, messagesIds: parsed_message.messages_ids}
                setMessageRead(readData)
            }
            // setData(message);
        };
    }

    useEffect(() => {
        establishWebSocket()
        gettingData();
    }, [ws]);


    useEffect(() => {
        updateChatOnNewMessage()
    }, [newMessage]);



    useEffect(() => {
        updateMessages()
    }, [oldMessages]);



    useEffect(() => {
        updateChat()
    }, [newChat]);

     useEffect(() => {
        updateMessagesOnRead()
    }, [messageRead]);


    useEffect(() => {
        fetchChats(token)
    }, [])


    useEffect(() => {document.title = 'Messenger'}, [])
    

    // useEffect(() => {
    //     window.addEventListener('resize', () => {
    //         let currentMode = detectMobile()
    //         if (isMobile !== currentMode){
    //             setIsMobile(currentMode)
    //         }
    //     })
    // }, [])
    
    return (
    
        isMobile
        ?
        <MobileChat chats={chats} currentChatId={currentChatId} setCurrentChatId={setCurrentChatId} loadOldestMessages={loadOldestMessages}/>
        :
        <Chat chats={chats} currentChatId={currentChatId} setCurrentChatId={setCurrentChatId} loadOldestMessages={loadOldestMessages}/>

    
    );
};

export default Chats;