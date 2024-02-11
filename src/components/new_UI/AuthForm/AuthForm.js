import React, {useState} from 'react';
import classes from './AuthForm.module.css'
import Input from "../Input/Input";
import Button from "../Button/Button";

const AuthForm = () => {

    const [registration, setRegistration] = useState(false)

    const formByType = (is_reg) => {
        if (is_reg){
            return subFormRegister()
        }
        else{
            return subFormLogin()
        }

    }


    const subFormRegister = () => {
        return <div className={classes.inputContainer}>
            <h1 >{"Register"}</h1>
            <Input styles={classes.input} placeholder={'Login'}></Input>
            <Input styles={classes.input} type={'password'}placeholder={'Password'}></Input>
            <Button styles={classes.button} >{'Submit'}</Button>

        </div>
    }

    const subFormLogin = () => {
        return <div className={classes.inputContainer}>
            <h1 >{"LogIn"}</h1>
            <Input styles={classes.input} placeholder={'Login'}></Input>
            <Input styles={classes.input} type={'password'}placeholder={'Password'}></Input>
            <Button styles={classes.button} >{'Submit'}</Button>

        </div>
    }

    const submit = (event) => {
        event.preventDefault()
    }


    return (
        <form onSubmit={submit} className={classes.container}>
            <div className={classes.chooseContainer}>
                <div onClick={() => {setRegistration(false)}} className={classes.options}>{'Login'}</div>
                <div className={classes.divider}></div>
                <div onClick={() => {setRegistration(true)}} className={classes.options}>{'Register'}</div>
            </div>
            {formByType(registration)}
        </form>
    );
};

export default AuthForm;