import React, {useEffect} from 'react';
import AuthForm from "../components/UI/AuthForm/AuthForm";
import Footer from "../components/UI/Footer/Footer";

const Welcome = () => {
    useEffect(() => {document.title = 'Login'}, [])

    return (
        <div>
            <AuthForm/>
            <Footer/>
        </div>
        
    );
};

export default Welcome;