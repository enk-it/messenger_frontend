import React, {useContext, useEffect, useState} from 'react'
import './styles/style.css'
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {AuthContext} from "./context";


function App() {

  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState('')
  const [userId, setUserId] = useState('')

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      console.log(localStorage.getItem('auth'))
    if (localStorage.getItem('auth') === 'logged'){
        setIsAuth(true)
        setToken(localStorage.getItem('token'))
    } else {
        setIsAuth(false)
        setToken('')
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
          <AppRouter/>
        </BrowserRouter>
      </AuthContext.Provider>

  )
}

export default App;
