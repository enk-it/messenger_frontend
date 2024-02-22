import React, {useContext, useEffect, useState, useRef} from 'react';
import classes from './StartChatForm.module.css'


const StartChatForm = ({state, setState}) => {

	const renderForm = (state) => {
		// console.log('Current state', state)
		if (state){
			return <div className={classes.newChatField}>
                    <div className={classes.chatsForm}> asd </div>
                </div>
		}
		return <div></div>
	}

	return renderForm(state)
                
}


export default StartChatForm;
