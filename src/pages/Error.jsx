import React, {useContext, useEffect} from 'react';
import {AuthContext} from "../context";

const Error = () => {

    useEffect(() => {document.title = 'Error'}, [])

    return (
        <div>
            <h1>404 Not Found</h1>
        </div>
        
    );
};

export default Error;