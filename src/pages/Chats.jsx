import React, {useContext, useEffect, useRef, useState} from 'react';
import {AuthContext} from "../context";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Chat from "../components/UI/Chat/Chat";




const Chats = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext)
    const {token, setToken} = useContext(AuthContext)

    const ws = useRef(null);

    const [chats, setChats] = useState([])

    const [currentChatId, setCurrentChatId] = useState(-1);

    const [newMessage, setNewMessage] = useState(null)

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
        console.log(response.data.chats, 'chats data from backend')
    })


    useEffect(() => {
        ws.current = new WebSocket("ws://192.168.0.12:8000/websocket_connection/"); // создаем ws соединение
        gettingData();
    }, [ws]);


    useEffect(() => {
        updateChats()
    }, [newMessage]);


    const updateChats = () => {

        if (chats.length === 0 || newMessage===null){
            console.log(newMessage)
            console.log(chats)
            return
        }


        console.log(newMessage)

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


    const gettingData = () => {
        if (!ws.current) return;

        ws.current.onmessage = e => {                //подписка на получение данных по вебсокету
            const message = e.data
            const errors = ['Auth failed. Check your Authorization data', 'Fake token', 'Your token is disabled']
            if (message === "Provide your Bearer token"){
                console.log(message)
                ws.current.send('Bearer ' + token)
            }
            else if (message === "Auth succeeded"){
                console.log(message)
                // ws.current.close()
            }
            else if (errors.includes(message)){
                console.log(message)
            }
            else{
                const new_message = JSON.parse(message)
                setNewMessage(new_message)
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