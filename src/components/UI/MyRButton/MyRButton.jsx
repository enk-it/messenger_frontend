import React from 'react';
import classes from './MyRButton.module.css'
const MyRButton = ({children, ...props}) => {
    return (
        <button {...props} className={classes.myRBtn}>
            X
        </button>
    );
};

export default MyRButton;