import React, {useContext, useEffect, useState} from 'react'
import './styles/style.css'
import {BrowserRouter, Link, Route, Routes, Switch, Redirect} from "react-router-dom";
import NotFound from "./pages/NotFound";
import Navbar from "./components/UI/Navbar/Navbar";
import {SwitchTransition} from "react-transition-group";
import AppRouter from "./components/AppRouter";
import {AuthContext} from "./context";


function App() {

  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState('')
  const [userId, setUserId] = useState('')


  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('auth')){
        setIsAuth(true)
        setToken(localStorage.getItem('token'))
    } else {
        setIsAuth(false)
        setToken(localStorage.getItem(''))
    }

    setIsLoading(false)
  }, [])

  return (
      <AuthContext.Provider value={{
          isAuth,
          setIsAuth,
          token,
          setToken,
          isLoading,
          userId,
          setUserId
      }}>
        <BrowserRouter>
          <Navbar/>
          <AppRouter/>
        </BrowserRouter>
      </AuthContext.Provider>

  )
}

export default App;
