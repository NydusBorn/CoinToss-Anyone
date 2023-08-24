import React from 'react'
import LoginForm from './LoginForm'
import './Starter.scss'
import MainPage from "./MainPage.tsx";

function Starter() {
    const login_data = [localStorage.getItem('login'), localStorage.getItem('password')]
    if (login_data[0] !== null && login_data[1] !== null) {
        //TODO: code to look up the user in a database
        return (
            <MainPage />
        )
    }else{
        return (
            <LoginForm />
        )
    }
}

export default Starter
