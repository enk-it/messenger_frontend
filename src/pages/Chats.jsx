import React, {useContext, useEffect, useRef, useState} from 'react';
import {AuthContext} from "../context";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Chat from "../components/UI/Chat/Chat";

//const server_path = 'ws://192.168.0.12:8000/' //debug
const server_path = 'wss://messenger.enkit.ru:443/api_ws/' //production
// const server_path = 'ws://192.168.0.17:8000/' //production


const Chats = () => {

    const {token, setToken} = useContext(AuthContext)

    // const ws = useRef(null);

    const [ws, setWs] = useState(null)

    const [chats, setChats] = useState([])

    const [currentChatId, setCurrentChatId] = useState(-1);

    const [messageRead, setMessageRead] = useState(null)
    const [newMessage, setNewMessage] = useState(null)
    const [newChat, setNewChat] = useState(null)


    const [fetchChats, isChatsLoading, chatsError] = useFetching(async (token) => {

        // console.log(token, 'That is the token i m trying to auth')

        const response = await PostService.getChats(token)
        // console.log(response.data.chats, 'the way it comes from backend')

        let backend_chats = response.data.chats


        backend_chats.sort(
            (m1, m2) => {
                return m1.chat_id - m2.chat_id;
            }
        )

        setChats(backend_chats);
        // console.log(response.data.chats, 'chats data from backend')
    })


    const establishWebSocket = () => {
        if (ws === null){
            setWs(new WebSocket(server_path + "websocket_connection/")); // создаем ws соединение
            console.log('WebSocket Connected')
        }
    }

    useEffect(() => {
        establishWebSocket()
        gettingData();
    }, [ws]);


    useEffect(() => {
        updateMessage()
    }, [newMessage]);

    useEffect(() => {
        updateChat()
    }, [newChat]);

     useEffect(() => {
        rewriteMessage()
    }, [messageRead]);

    const rewriteMessage = () => {
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

        // console.log('Чат после обновления', newChats)
        setChats(newChats)
        
    }


    const updateMessage = () => {
        if (chats.length === 0 || newMessage===null){
            // console.log(newMessage)
            // console.log(chats)
            return
        }

        // console.log(newMessage)

        let newChats = []


        // console.log(new_message)
        for (let i = 0; i < chats.length; i++){
            const updatedChat = chats[i]

            if (chats[i].chat_id === newMessage.chat_id){
                // console.log( [new_message, ...chats[i].messages], 'asdasdasd')

                // chats[i].messages = [new_message, ...chats[i].messages]

                updatedChat.messages.unshift(newMessage)
                // console.log( 'asd')
                // console.log( chats[i])

                // chats[i].messages.unshift(new_message)

            }

            newChats = [updatedChat,...newChats]
            // updatedChats.push(updatedChat)

        }

        newChats.sort(
            (m1, m2) => {
                return m1.chat_id - m2.chat_id;
            }
        )

        setChats(newChats)
    }


    const updateChat = () => {
        if (newChat===null){
            // console.log(newChat)
            // console.log(chats)
            return
        }

        // console.log(newChat)

        let newChats = []

        // console.log(new_message)
        // for (let i = 0; i < chats.length; i++){
        //     const old_chat = chats[i]
        //     newChats = [old_chat,...newChats]
        // }

        // newChats = [newChat,...newChats]
        newChats = [newChat,...chats]

        // newChats.sort(
        //     (m1, m2) => {
        //         return m1.chat_id - m2.chat_id;
        //     }
        // )

        setChats(newChats)
    }


    const gettingData = () => {
        if (!ws) return;

        ws.onclose = () => {setWs(null); console.log('WebSocket Disconnected')}
        ws.onmessage = e => {                //подписка на получение данных по вебсокету
            const message = e.data

            const parsed_message = JSON.parse(message)

            const errors = ['Auth failed. Check your Authorization data', 'Fake token', 'Your token is disabled']
            if (parsed_message.info === "Provide your Bearer token"){
                ws.send('Bearer ' + token)
            }
            else if (parsed_message.info === "Auth succeeded"){
                console.log('WebSocket connection is estabilished succesfully')
            }
            else if (errors.includes(parsed_message.info)){
                console.log(parsed_message.info)
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
        fetchChats(token)
    }, [])



    return (
        <Chat chats={chats} currentChatId={currentChatId} setCurrentChatId={setCurrentChatId} />
    );
};

export default Chats;