import React, {useContext, useEffect, useState, useRef, useCallback} from 'react';
import classes from './StartChatForm.module.css'
import Input from "../Input/Input";
import Button from "../Button/Button";
import UserMiniature from "../UserMiniature/UserMiniature";

import {AuthContext} from "../../../context";
import {useFetching} from "../../../hooks/useFetching";
import PostService from "../../../API/PostService";



const StartChatForm = ({state, setState}) => {

	const {token, setToken} = useContext(AuthContext)
    const [users, setUsers] = useState([])
	const ref = useRef(null);
	const [query, setQuery] = useState('')


	const selfClose = useCallback((event) => {
        if (event.key === 'Escape') {
            setState(false)
        }
    }, []);

    useEffect(() => {
        if (ref.current !== null) {
        	// attach the event listener
        	ref.current.addEventListener('keydown', selfClose);

        	// remove the event listener
        	return () => {
            	ref.current.removeEventListener('keydown', selfClose);
        };
        }
        
    }, [selfClose]);


    const [fetchUsers, isUsersLoading, usersError] = useFetching(async (token) => {

        // console.log(token, 'That is the token i m trying to auth')

        const response = await PostService.getUsers(token)

        setUsers(response.data.users)

    })

    const [fetchStartChat, isLoading, error] = useFetching(async (token, user_id) => {

        const response = await PostService.startChat(token, user_id)
        if (response.data.status !== 200){
            alert(response.data.detail)
        }
    })


    const startChat = (user_id) => {
        fetchStartChat(token, user_id)
    }

    useEffect(() => {
        fetchUsers(token)
    }, [])



	return <div>
			{
				state
				?
				<div className={classes.newChatField} ref={ref}>
                    <div className={classes.chatsForm}>

                    <div className={classes.horizontalContainer}>
                    	<Input placeholder={'Search'} styles={classes.Input} onChange={(e) => {setQuery(e.target.value)}}></Input>  
                    	<Button styles={classes.closeButton} onClick={() => {setState(false)}}>
                    		Close
                    	</Button>
                    </div>
                    
                    <div className={classes.containerDiv}>
                    	{
                    		users.map(user => {
                			return <UserMiniature user={user} startChat={startChat}/>
                		})
                    	}
                    </div>
                    </div>
                </div>
                :
                <div></div>
			}

		</div>
                
}


export default StartChatForm;
