import axios from "axios";
import { getSHA256Hash } from "boring-webcrypto-sha256";


// const server_path = 'http://192.168.0.12:8000/' //debug
const server_path = 'https://messenger.gladyshdd.ru:443/api/' //debug
// const server_path = 'http://192.168.0.17:8000/' //production


export default class PostService {


    static async login(username, password, client_id){
        let hashed_password = await getSHA256Hash(password)
        const response = await axios.post(server_path + 'login/', {username:username, hashed_password:hashed_password, client_id:client_id})
        return response
    }


    static async register(username, password, client_id){
        let hashed_password = await getSHA256Hash(password)
        const response = await axios.post(server_path + 'register/', {username:username, hashed_password:hashed_password, client_id: client_id})
        return response
    }

    static async getChats(token) {
        const response = await axios.get(server_path + 'get_chats/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }})
        return response
    }


    static async getUsers(token) {
        const response = await axios.get(server_path + 'get_users/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }})
        return response
    }

    static async getMessages(token, chat_id) {
        const response = await axios.get(server_path + 'get_messages/', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: { chat_id: chat_id }
            })
        return response
    }



    static async getOlderMessages(token, chat_id, message_id) {
        const response = await axios.get(server_path + 'get_messages/', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: { chat_id: chat_id, oldest_message_id:message_id}
            })
        return response
    }




    static async sendMessage(token, chat_id, content) {
        const response = await axios.post(server_path + 'send_message/', {
            chat_id:chat_id,
            content:content
        },
        {
            headers: {'Authorization': `Bearer ${token}`}
        }
        )
        return response
    }

    static async startChat(token, user_id) {
        try {
            const response = await axios.get(server_path + 'start_chat/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    params: { user_id: user_id }
                }
            )
            return response
        }
        catch (error){
            return error.response
        }

    }

    static async readMessage(token, chatId, messagesIds, usersIds) {
        try {
            const response = await axios.post(server_path + 'read_message/', {
                chat_id:chatId,
                messages_ids:messagesIds,
                users_ids:usersIds
            },
            {
                headers: {'Authorization': `Bearer ${token}`}
            }
        )
        return response
        }
        catch (error){
            return error.response
        }

    }
}