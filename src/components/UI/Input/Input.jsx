import React from 'react';
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {

    return (
        // <input ref={ref} className={classes.Input} {...props}/>
        <input ref={ref} className={[classes.Input, props.styles].join(' ')} {...props}/>

    )
});

export default Input;