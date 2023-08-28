import React from "react";
import sassmod from "./SettingsPage.module.scss";
import sassutil from "./Utility.module.scss"
import classNames from "classnames";
import * as utility from "./Utility.ts"

//TODO: maybe deal with request bombardment
//TODO: when changing value of the slider

function SettingsPage() {
    const [perceivedName, setPerceivedName] = React.useState("");
    const [coinLuck, setCoinLuck] = React.useState(0.5);
    const [nameErrorHidden, setNameErrorHidden] = React.useState(true);
    const [coinErrorHidden, setCoinErrorHidden] = React.useState(true);
    
    const luckError = "Must be a number with a value between 0 and 1";
    const nameError = "Must be shorter than 256 characters";
    
    async function loadValues(){
        setPerceivedName(await utility.apiGet<string>(`http://localhost:8080/user/getName?username=${localStorage.getItem("login")}&password=${localStorage.getItem("password")}`));
        const coin = await utility.apiGet<number>(`http://localhost:8080/user/getCoinLuck?username=${localStorage.getItem("login")}&password=${localStorage.getItem("password")}`);
        setCoinLuck(coin);
        document.querySelector("textarea[name='coinLuckField']")!.value = coin;
    }
    
    function updateName(val:string){
        setPerceivedName(val);
        void utility.apiPost("http://localhost:8080/user/setName", utility.prepareMap(new Map<string, string>([
            ["username", localStorage.getItem("login")!],
            ["password", localStorage.getItem("password")!],
            ["name", val]
        ])));
    }
    
    function updateCoinLuck(val:number){
        const luckField = document.querySelector("textarea[name='coinLuckField']")!;
        setCoinLuck(val);
        luckField.className = classNames(sassmod.cardField, sassutil.sizeUnchangeable);
        setCoinErrorHidden(true);
        if (luckField.value != val) luckField.value = val.toString();
        void utility.apiPost("http://localhost:8080/user/setCoinLuck", utility.prepareMap(new Map<string, string>([
            ["username", localStorage.getItem("login")!],
            ["password", localStorage.getItem("password")!],
            ["luck", val.toString()]
        ])));
    }
    
    void loadValues();
    
    return (
        <div className={sassmod.settingsPageContainer}>
            <div className={sassmod.card}>
                <p className={sassmod.cardDescriptor}>Your perceived name</p>
                <div className={sassmod.cardSpacer}/>
                <div className={sassmod.cardFieldContainer}>
                    <textarea className={classNames(sassmod.cardField, sassutil.sizeUnchangeable)} value={perceivedName} onChange={event => {
                        const name:string = event.target.value;
                        if (name.length > 256) {
                            event.target.className = classNames(sassmod.cardField, sassmod.cardFieldError, sassutil.sizeUnchangeable);
                            setNameErrorHidden(false);
                        }
                        else {
                            setNameErrorHidden(true);
                            updateName(name);
                        }
                    }}/>
                    <p className={sassmod.cardFieldError} hidden={nameErrorHidden}>{nameError}</p>
                </div>
            </div>
            <div className={sassmod.card}>
                <p className={sassmod.cardDescriptor}>Coin Toss chance - How often the coin toss results in heads</p>
                <div className={sassmod.cardSpacer}/>
                <input type={"range"} className={sassmod.cardSlider} min={0} max={1} step={0.01} value={coinLuck} onInput={event => {
                    updateCoinLuck(event.target.value);
                }}/>
                <div className={sassmod.cardFieldContainer}>
                    <textarea name={"coinLuckField"} className={classNames(sassmod.cardField, sassutil.sizeUnchangeable)} onChange={event => {
                        const luck:number = parseFloat(event.target.value);
                        if (isNaN(luck) || luck < 0 || luck > 1) {
                            event.target.className = classNames(sassmod.cardField, sassmod.cardFieldError, sassutil.sizeUnchangeable);
                            setCoinErrorHidden(false);
                        }
                        else {
                            updateCoinLuck(luck);
                        }
                    }}/>
                    <p className={sassmod.cardError} hidden={coinErrorHidden} >{luckError}</p>
                </div>
                
            </div>
            <div className={sassmod.verticalSpacer} />
            <button className={sassmod.resetButton} onClick={()=>{
                localStorage.setItem('requireRefresh', "Yes");
                const username = localStorage.getItem('login')!
                const password = localStorage.getItem('password')! 
                void utility.apiPost("http://localhost:8080/user/resetCash", utility.prepareMap(new Map<string, string>([
                    ["username", username],
                    ["password", password]
                ])));
            }}>
                Reset Credits
            </button>
            <button className={sassmod.exitButton} onClick={()=>{
                localStorage.clear();
                window.location.href = "";
            }}>
                Quit
            </button>
        </div>
    )
}

export default SettingsPage;