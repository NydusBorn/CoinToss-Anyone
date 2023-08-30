import React from 'react'
import LoginForm from './LoginForm'
import './Starter.scss'
import MainPage from "./MainPage.tsx";
import * as utility from "./Utility.ts"

function Starter() {
    const login_data = [localStorage.getItem('login'), localStorage.getItem('password')]
    const [madeAttempt, setMadeAttempt] = React.useState(false);
    const [correctLogin, setCorrectLogin] = React.useState(false);
    
    async function checkLogin(){
        if (madeAttempt) return;
        setCorrectLogin(login_data[0] !== null && login_data[1] !== null && await utility.apiGet<boolean>(`http://localhost:8080/user/credentialsCorrect?username=${login_data[0]}&password=${login_data[1]}`))
        setMadeAttempt(true);
    }
    void checkLogin();
    return (
        <>
            <div hidden={!madeAttempt || !correctLogin}>
                <MainPage />
            </div>
            <div hidden={!madeAttempt || correctLogin}>
                <LoginForm />
            </div>
        </>
    )
}

export default Starter
