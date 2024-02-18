import React, {useContext, useEffect, useRef} from 'react';
import classes from './Message.module.css'

const Message = ({content, datetime, incoming, is_read}) => {

    const getReadableDate = (timestamp) => {
        // return new Intl.DateTimeFormat('ru-RU', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp * 1000)
        return new Intl.DateTimeFormat('ru-RU', {hour: '2-digit', minute: '2-digit'}).format(timestamp * 1000)
    }

    const renderMessage = () => {
        let stylesPlaceholder = null
        let stylesContainer = null

        if (incoming === true){
            stylesPlaceholder = classes.messagePlaceholderRight
            stylesContainer = classes.containerRight
        }
        else{
            stylesPlaceholder = classes.messagePlaceholderLeft
            stylesContainer = classes.containerLeft
        }


        return  <div className={stylesPlaceholder}>
                    <div className={stylesContainer}>
                        <div className={classes.read_indicator}></div>
                        <div className={classes.singleMessage}>
                            <div>
                                {content}
                            </div>
                            <div className={classes.messageTime}>
                                {getReadableDate(datetime)}
                            </div>
                        </div>
                    </div>
               </div>
    }

    return renderMessage();
};

export default Message;