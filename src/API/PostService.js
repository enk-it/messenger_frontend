import axios from "axios";

const server_path = 'http://192.168.0.12:8000/' //debug
// const server_path = 'http://192.168.0.17:8000/' //production


export default class PostService {


    static async tryLogin(username, password){
        const response = await axios.post(server_path + 'login/', {username:username, hashed_password:password, client_id:'12'})
        return response
    }


    static async tryRegister(username, password, client_id){
        const response = await axios.post(server_path + 'register/', {username:username, hashed_password:password, client_id: client_id})
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



}