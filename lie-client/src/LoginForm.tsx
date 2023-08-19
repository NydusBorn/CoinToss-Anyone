import React from 'react'
import './LoginForm.css'
import {HttpProxy} from "vite";
import {Simulate} from "react-dom/test-utils";
import resize = Simulate.resize;

async function apiGet<T>(url: string): Promise<T> {
    const Response = await fetch(url);
    if (Response.ok) {
        return Response.json() as T;
    }
    else
    {
        console.log("apiget failed");
        console.log(`is it ok? ${Response.ok}`);
        console.log(`status code: ${Response.status}`);
        console.log(`status text: ${Response.statusText}`);
        console.log(`url: ${Response.url}`);
        
        console.log(`body: ${typeof Response.body}`);
        console.log(`json: ${await Response.json()}`);
        throw new Error("Get failure");
    }
}

async function apiPost<T>(url: string, data: object): Promise<T> {
    const Response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    if (Response.ok) {
        return Response.json() as T;
    }
    else
    {
        console.log("apipost failed");
        console.log(`is it ok? ${Response.ok}`);
        console.log(`status code: ${Response.status}`);
        console.log(`status text: ${Response.statusText}`);
        console.log(`url: ${Response.url}`);
        console.log(`body: ${typeof Response.body}`);
        console.log(`request body: ${JSON.stringify(data)}`)
        console.log(`json: ${await Response.json()}`);
        throw new Error("Get failure");
    }
}



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

    async function enterLogin(){
        if (username !== ""){
            setUserSelected(true);
            const exists = await apiGet<boolean>(`http://localhost:8080/user/exists?username=${username}`); 
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
        if (password !== ""){
            if (userExists){
                const credentialsCorrect = await apiGet<boolean>(`http://localhost:8080/user/credentialsCorrect?username=${username}&password=${password}`);
                if (credentialsCorrect) {
                    localStorage.setItem("login", username);
                    localStorage.setItem("password", password);
                    window.location.href = "";
                }
                else if (!credentialsCorrect){
                    //TODO: notify that password is incorrect
                }
            }
            else{
                await apiPost<boolean>(`http://localhost:8080/user/register`, Object.fromEntries(Array.from(new Map<string, string>([
                    ["username", username],
                    ["password", password]
                ]))));
                localStorage.setItem("login", username);
                localStorage.setItem("password", password);
                window.location.href = "";
            }
            setUserSelected(true);
        }
    }
    
    return (
        <>
            <h1>Welcome to a Casino Lie instance</h1>

            <div hidden={userSelected} className={"card"} >
                <div className={"enter-area"}>
                    <header className="">Login</header>
                    <textarea className="size-unchangeable input-area" name="user_login" onChange={(e)=>{
                        setUsername(e.target.value);
                    }}></textarea>
                </div>
                <button className="enter-button" onClick={enterLogin}>Next</button>
            </div>
            
            <div hidden={!userSelected} className={"card"}>
                <h2>{`${greeting}`}</h2>
                <div className={"enter-area"}>
                    <button className={"back-button"} onClick={()=>{
                        setUserSelected(false);
                    }}>back</button>
                    <header className="">Password</header>
                    <textarea className="size-unchangeable input-area" name="user_password" onChange={(e)=>{
                        setPassword(e.target.value);
                    }}></textarea>
                </div>
                <button className="enter-button" onClick={enterPassword}>{buttonText}</button>
            </div>
        </>
    )
}

export default LoginForm 