import React from 'react';
import classes from "./UserMiniature.module.css";
import Button from "../Button/Button";


const UserMiniature = ({user, startChat}) => {

    const online = (status) => {
        if (status === true){
            return <div className={classes.greenStatus}></div>
        }
        return <div className={classes.redStatus}></div>
    }

    return (
        <div className={classes.userMiniature}>
            <div className={classes.pictureBackground}>
                    <img src={'http://messenger.enkit.ru/api/share/avatar/' + user.avatar_url} className={classes.userPicture} alt=""/>
            </div>
            {online(user.is_online)}

            <div className={classes.vericalContainer}>
                <div className={classes.userText}>{user.username}</div>
                <div className={classes.userText}>{'id' + user.user_id}</div>
            </div>


            <Button styles={classes.startButton} onClick={() => {startChat(user.user_id)}}>Start Chat</Button>
        </div>
    );
};

export default UserMiniature;