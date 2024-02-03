import axios from "axios";

export default class PostService {

    static async tryLogin(username, password){
        const response = await axios.post('http://192.168.0.12:8000/login/', {username:username, hashed_password:password, client_id:'12'})
        return response
    }


    static async tryRegister(username, password, client_id){
        const response = await axios.post('http://192.168.0.12:8000/register/', {username:username, hashed_password:password, client_id: client_id})
        return response
    }

    static async getChats(token) {
        const response = await axios.get('http://192.168.0.12:8000/get_chats/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }})
        return response
    }


    static async getUsers(token) {
        const response = await axios.get('http://192.168.0.12:8000/get_users/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }})
        return response
    }

    static async getMessages(token, chat_id) {
        const response = await axios.get('http://192.168.0.12:8000/get_messages/', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: { chat_id: chat_id }
            })
        return response
    }

    static async sendMessage(token, chat_id, content) {
        const response = await axios.post('http://192.168.0.12:8000/send_message/', {
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
        const response = await axios.get('http://192.168.0.12:8000/start_chat/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                params: { user_id: user_id }
            }
        )
        return response
    }



}