import React from 'react'
import sassmod from './LoginForm.module.scss'
import * as utility from "./Utility.ts";
import sassutil from "./Utility.module.scss"
import classNames from 'classnames';

//TODO: animations

function LoginForm() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [userSelected, setUserSelected] = React.useState(false);
    const newUserGreeting = `New user will be created with name '${username}'`;
    const existingUserGreeting = `Existing user with name '${username}' will be logged in`;
    const newUserButton = "Create new user";
    const existingUserButton = "Login";
    const [greeting, setGreeting] = React.useState(newUserGreeting); 
    const [userExists, setUserExists] = React.useState(false);
    const [buttonText, setButtonText] = React.useState(newUserButton);
    const [errorHidden, setErrorHidden] = React.useState(true);
    const [currentError, setCurrentError] = React.useState("Default error");
    
    function checkUsername() {
        if (username.length > 256){
            setErrorHidden(false);
            setCurrentError("Username too long: must be less than 256 characters");
        }
        else {
            setErrorHidden(true);
        }
    }
    function checkPassword(){
        if (password.length > 256){
            setErrorHidden(false);
            setCurrentError("Password too long: must be less than 256 characters");
        }
        else if (password.length < 8){
            setErrorHidden(false);
            setCurrentError("Password too short: must be at least 8 characters");
        }
        else{
            setErrorHidden(true);
        }
    }
    async function enterLogin(){
        checkUsername();
        if (username !== "" && errorHidden){
            setUserSelected(true);
            const exists = await utility.apiGet<boolean>(`http://localhost:8080/user/exists?username=${username}`); 
            if (!exists) {
                setGreeting(newUserGreeting);
                setButtonText(newUserButton);
                setUserExists(false);
            }
            else{
                setGreeting(existingUserGreeting);
                setButtonText(existingUserButton);
                setUserExists(true);
            }
        }
    }
    
    async function enterPassword(){
        checkPassword()
        if (password !== "" && errorHidden){
            if (userExists){
                const credentialsCorrect = await utility.apiGet<boolean>(`http://localhost:8080/user/credentialsCorrect?username=${username}&password=${password}`);
                if (credentialsCorrect) {
                    localStorage.setItem("login", username);
                    localStorage.setItem("password", password);
                    window.location.href = "";
                }
                else if (!credentialsCorrect){
                    setCurrentError("Wrong password");
                    setErrorHidden(false);
                }
            }
            else{
                await utility.apiPost<boolean>(`http://localhost:8080/user/register`, utility.prepareMap(new Map<string, string>([
                    ["username", username],
                    ["password", password]
                ])));
                localStorage.setItem("login", username);
                localStorage.setItem("password", password);
                window.location.href = "";
            }
            setUserSelected(true);
        }
    }
    
    return (
        <div className={sassmod.loginForm}>
            <h1>Welcome to a Casino Lie instance</h1>

            <div hidden={userSelected} className={sassmod.card} >
                <div className={sassmod.enterArea}>
                    <header>Login</header>
                    <textarea className={classNames(sassutil.sizeUnchangeable, sassmod.inputArea)} name="user_login" onChange={(e)=>{
                        setUsername(e.target.value);
                        checkUsername();
                    }}></textarea>
                </div>
                <div hidden={errorHidden} className={sassmod.errorCard} >
                    <p>{currentError}</p>
                </div>
                <button className={sassmod.enterButton} onClick={enterLogin}>Next</button>
            </div>
            
            <div hidden={!userSelected} className={sassmod.card}>
                <h2>{`${greeting}`}</h2>
                <div className={sassmod.enterArea}>
                    <button className={sassmod.backButton} onClick={()=>{
                        setUserSelected(false);
                    }}>back</button>
                    <header >Password</header>
                    <textarea className={classNames(sassutil.sizeUnchangeable, sassmod.inputArea)} name="user_password" onChange={(e)=>{
                        setPassword(e.target.value);
                        checkPassword();
                    }}></textarea>
                </div>
                <div hidden={errorHidden} className={sassmod.errorCard} >
                    <p>{currentError}</p>
                </div>
                <button className={sassmod.enterButton} onClick={enterPassword}>{buttonText}</button>
            </div>
        </div>
    )
}

export default LoginForm 