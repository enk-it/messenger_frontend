import React from 'react';
import classes from "./UsersList.module.css";
import UserMiniature from "../UserMiniature/UserMiniature";


const UsersList = ({users, startChat}) => {
    return (
        <div className={classes.list}>
        {
            users.map(user => {
                return <UserMiniature user={user} startChat={startChat}/>
                })
        }
        </div>
    );
};

export default UsersList;