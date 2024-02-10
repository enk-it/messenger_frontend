import React, {useContext} from 'react';
import cl from './Navbar.module.css'
import { useNavigate } from 'react-router-dom'
import {AuthContext} from "../../../context";
import MyButton from "../button/MyButton";


const Navbar = () => {
    const navigate = useNavigate()

    const {isAuth, setIsAuth} = useContext(AuthContext)

    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem('auth')
    }

    const RenderNavBar = () => {
        if (isAuth){
            return [<MyButton  onClick={() => navigate("/chats")}>
                Chats
            </MyButton>,
            <MyButton  onClick={() => navigate("/users")}>
                Users
            </MyButton>,
            <MyButton  onClick={() => navigate("/profile")}>
                Profile
            </MyButton>,
            <MyButton onClick={logout}>
                LogOut
            </MyButton>]
        }
        else{
            return [<MyButton onClick={() => navigate("/login")}>Login</MyButton>,
                <MyButton onClick={() => navigate("/register")}>
                    Register
                </MyButton>]
        }
    }



    return (
        <div className={cl.navbar}>
            <div className={cl.navbar__links}>

                {RenderNavBar()}

            </div>

        </div>
    );
};

export default Navbar;