import React from 'react'
import './LoginForm.css'
import {HttpProxy} from "vite";
import {Simulate} from "react-dom/test-utils";
import resize = Simulate.resize;

function api<T>(url: string): Promise<T> {
    return fetch(url, {mode: "no-cors"})
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status.toString())
            }
            return response.json() as Promise<{ data: T }>
        })
        .then(data => {
            return data.data
        })
}

function LoginForm() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [inputuser, setInputuser] = React.useState("");
    const [inputpass, setInputpass] = React.useState("");
    const [userSelected, setUserSelected] = React.useState(false);
    const newUserGreeting = `New user will be created with name '${username}'`;
    const existingUserGreeting = `Existing user with name '${username}' will be logged in`;
    const newUserButton = "Create new user";
    const existingUserButton = "Login";
    let greeting:string = newUserGreeting;
    let userExists = false;
    let buttonText = newUserButton;
    return (
        <>
            <h1>Welcome to a Casino Anyplay instance</h1>

            <div hidden={userSelected} className={"card"} >
                <div className={"enter-area"}>
                    <header className="">Login</header>
                    <textarea className="size-unchangeable input-area" name="user_login" onChange={(e)=>{
                        setInputuser(e.target.value);
                    }}></textarea>
                </div>
                <button className="enter-button" onClick={()=>{
                    if (inputuser !== ""){
                        setUsername(inputuser);
                        setUserSelected(true);
                        //TODO: look whether name exists and determine whether to use alternative greeting
                        if (api(`https://localhost:7237/Users/GetUserExists?username=${inputuser}`)) {
                            greeting = newUserGreeting;
                            buttonText = newUserButton;
                        }
                        else{
                            greeting = existingUserGreeting;
                            buttonText = existingUserButton;
                        }
                    }
                }}>Next</button>
            </div>
            
            <div hidden={!userSelected} className={"card"}>
                <h2>{`${greeting}`}</h2>
                <div className={"enter-area"}>
                    <button className={"back-button"} onClick={()=>{
                        setUserSelected(false);
                    }}>back</button>
                    <header className="">Password</header>
                    <textarea className="size-unchangeable input-area" name="user_password" onChange={(e)=>{
                        setInputpass(e.target.value);
                    }}></textarea>
                </div>
                <button className="enter-button" onClick={()=>{
                    if (inputpass !== ""){
                        if (userExists && password) {
                            //TODO: check whether the password hash matches the one stored in database
                        }
                        else if (!userExists){
                            //TODO: create new user
                        }
                        setPassword(inputpass);
                        setUserSelected(true);
                    }
                }}>{buttonText}</button>
            </div>
        </>
    )
}

export default LoginForm 