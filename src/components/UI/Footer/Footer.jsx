import React, {useContext, useRef, useState} from 'react';
import classes from './Footer.module.css'



const Footer = () => {

        const [state, setState] = useState(true)

        const getStyles = (isVisible) => {
            if (isVisible){
                return classes.footer
            }
            else{
                return classes.hidden
            }
        }


	    return (

        <div className={getStyles(state)} onClick={() => {setState(false)}}>

    	    <div className={classes.horizontalContainer}>
    	    	<div className={classes.verticalContainer}>
    	    		<p>This Messenger was created as pet project. It shouldn't be used as communicating service.The author is not responsible for the safety of the transmitted information, and does not guarantee the delivery of messages</p>
    	    	</div>

    	    	<div className={classes.verticalContainer}>
    	    		<p>Этот Мессенджер был создан в качестве учебного (домашнего проекта). Его не следует использовать в качестве сервиса для общения. Автор не несёт ответственности за сохранность передаваемой информации, и не гарантирует доставку сообщений.</p>
    	    	</div>
    	    </div>

        	<hr className={classes.divider} />

    	    <div className={classes.verticalContainer}>
    	    	<p><a href='https://t.me/GladyshDD' target="_blank">Telegram</a></p>
    	    	<p><a href='https://vk.com/4bad0request0' target="_blank">VK</a></p>
    	    	<p><a href='https://github.com/enk-it' target="_blank">GitHub</a></p>
    	    </div>
        	
        </div>
    );
};

export default Footer;