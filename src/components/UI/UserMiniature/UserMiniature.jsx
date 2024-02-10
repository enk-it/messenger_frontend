import React from 'react';
import classes from "./UserMiniature.module.css";
import default_avatar from '../../../pictures/avatar.png';
import MyButton from "../button/MyButton";


const UserMiniature = ({user, startChat}) => {

    const online = (status) => {
        if (status === true){
            return "Online"
        }
        return 'Offline'
    }

    return (
        <div className={classes.user_miniature} onClick={() => {
            // console.log(chat);
        }}>
            <div className={classes.subMessage}>
                <div className={classes.pictureBackground}>
                    <img src={'http://192.168.0.12:8000/share/avatar/' + user.avatar_url} className={classes.userPicture} alt=""/>
                </div>
                <div className={classes.userText}>{user.username}</div>
                <div className={classes.userText}>{'id' + user.user_id}</div>
                <div className={classes.userText}>{online(user.is_online)}</div>

                <MyButton onClick={() => {startChat(user.user_id)}}>Start Chat</MyButton>
            </div>
        </div>
    );
};

export default UserMiniature;