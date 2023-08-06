import React from 'react'
import './LoginForm.css'

function LoginForm() {
    
    return (
        <>
            <h1>Welcome to Casino Anyplay instance</h1>
            
            <div>
                <header className="">Login</header>
                <textarea className="" name="user_login"></textarea>
                <button className="">Enter</button>
            </div>
            
            <div hidden={true}>
                <header className="">password</header>
                <textarea className="" name="user_password"></textarea>
                <button className="">Enter</button>
            </div>
        </>
    )
}

export default LoginForm 