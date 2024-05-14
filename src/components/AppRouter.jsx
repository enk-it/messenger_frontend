import React, {useContext, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import {publicRoutes, privateRoutes} from "../router/routes";
import {AuthContext} from "../context";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext)

    console.log(isAuth)

    if (isLoading){
        return <Loader/>
    }

    if (isAuth){
        return (
            <Routes>
                {privateRoutes.map(route => <Route key={route.key} path={route.path} element={route.component}  exact={route.exact} />)}
            </Routes>
        )
    }
    else{
        return (
            <Routes>
                {publicRoutes.map(route => <Route key={route.key} path={route.path} element={route.component}  exact={route.exact} />)}
            </Routes>
        )
    }

};

export default AppRouter;