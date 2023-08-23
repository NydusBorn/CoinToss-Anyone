import React from 'react'
import LoginForm from './LoginForm'
import './Starter.css'
import MainPage from "./MainPage.tsx";

function Starter() {
    const login_data = [localStorage.getItem('login'), localStorage.getItem('password')]
    if (login_data[0] !== null && login_data[1] !== null) {
        // code to look up the user in a database
        return (
            <React.StrictMode>
                <MainPage />
            </React.StrictMode>
        )
    }else{
        return (
            <React.StrictMode>
                <LoginForm />
            </React.StrictMode>
        )
    }
}

export default Starter
