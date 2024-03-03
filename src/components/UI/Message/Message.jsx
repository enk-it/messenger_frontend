import React, {useContext, useEffect, useRef} from 'react';
import classes from './Message.module.css'

const Message = ({content, datetime, incoming, is_read}) => {

    const messageBody = useRef(null)

    const getReadableDate = (timestamp) => {
        // return new Intl.DateTimeFormat('ru-RU', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp * 1000)
        return new Intl.DateTimeFormat('ru-RU', {hour: '2-digit', minute: '2-digit'}).format(timestamp * 1000)
    }

    const renderIndicator = () => {
        if (incoming === false && is_read === false){
            return <div className={classes.read_indicator}></div>
        }
        else{
            return <div></div>
        }
    }

    let stylesPlaceholder = null
    let stylesContainer = null
    let stylesMessage = null

    if (incoming === true){
        stylesPlaceholder = classes.messagePlaceholderRight
        stylesContainer = classes.containerRight
        stylesMessage = classes.singleMessage + ' ' + classes.messageIncoming
    }
    else{
        stylesPlaceholder = classes.messagePlaceholderLeft
        stylesContainer = classes.containerLeft
        stylesMessage = classes.singleMessage + ' ' + classes.messageOutcoming
    }



    return  <p className={stylesPlaceholder}>
                    <div className={stylesContainer}>
                        <div className={classes.indicatorContainer}>
                            {renderIndicator()}
                        </div>
                        <div className={stylesMessage}>
                            <div className={classes.text}>
                                {content}
                            </div>
                            <div className={classes.messageTime}>
                                {getReadableDate(datetime)}
                            </div>
                        </div>
                    </div>
               </p>
};

export default Message;