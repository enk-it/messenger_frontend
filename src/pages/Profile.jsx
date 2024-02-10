import React, {useContext, useEffect, useRef, useState} from 'react';
import {AuthContext} from "../context";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";

const server_path = 'ws://192.168.0.12:8000/' //debug
// const server_path = 'ws://192.168.0.17:8000/' //production


const Profile = () => {

    const {token, setToken} = useContext(AuthContext)


    return (
        <div>
            {'Profile Page'}
        </div>
    );
};

export default Profile;