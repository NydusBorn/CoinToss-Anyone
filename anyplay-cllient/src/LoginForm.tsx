import React from 'react'
import './LoginForm.css'

function LoginForm() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [inputuser, setInputuser] = React.useState("");
    const [inputpass, setInputpass] = React.useState("");
    const [userSelected, setUserSelected] = React.useState(false);
    const newUserGreeting = `New user will be created with name '${username}'`;
    const existingUserGreeting = `Existing user with name '${username}' will be logged in`;
    let greeting:string = newUserGreeting;
    let userExists = false;
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
                        if (true) {
                            greeting = newUserGreeting;
                        }
                        else{
                            greeting = existingUserGreeting;
                        }
                    }
                }}>Enter</button>
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
                }}>Enter</button>
            </div>
        </>
    )
}

export default LoginForm 