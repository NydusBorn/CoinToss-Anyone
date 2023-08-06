import React from 'react'
import LoginForm from './LoginForm'
import './Starter.css'

function Starter() {
    const login_data = [localStorage.getItem('login'), localStorage.getItem('password')]
    console.log(login_data[0])
    console.log(login_data[1])
    if (login_data[0] !== null && login_data[1] !== null) {
        // code to look up the user in a database
        return (
            <React.StrictMode>
                <button className="" onClick={() => {
                    localStorage.clear()
                    window.location.href = ''
                }}>Exit user</button>
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
