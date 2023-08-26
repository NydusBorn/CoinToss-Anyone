import React from "react";
import sassmod from "./SettingsPage.module.scss";
import sassutil from "./Utility.module.scss"
import classNames from "classnames";
import * as utility from "./Utility.ts"

function SettingsPage() {
    const [coinLuck, setCoinLuck] = React.useState(0.5);
    const [slotsLuck, setSlotsLuck] = React.useState(0.5);
    
    return (
        <div className={sassmod.settingsPageContainer}>
            <div className={sassmod.card}>
                <p className={sassmod.cardDescriptor}>Your perceived name</p>
                <div className={sassmod.cardSpacer}/>
                <textarea className={classNames(sassmod.cardField, sassutil.sizeUnchangeable)}></textarea>
            </div>
            <div className={sassmod.card}>
                <p className={sassmod.cardDescriptor}>Coin Toss chance - How often the coin toss results in heads</p>
                <div className={sassmod.cardSpacer}/>
                <input type={"range"} className={sassmod.cardSlider} min={0} max={1} step={0.01} value={coinLuck} onInput={event => {
                    setCoinLuck(event.target.value);
                }}/>
                <textarea className={classNames(sassmod.cardField, sassutil.sizeUnchangeable)}></textarea>
            </div>
            <div className={sassmod.card}>
                <p className={sassmod.cardDescriptor}>
                    {"Slots luck - likelihood of a positive outcome. "}
                    <br />
                    {"Values greater than 0.5 should result in long term positive results."}
                </p>
                <div className={sassmod.cardSpacer}/>
                <input type={"range"} className={sassmod.cardSlider} min={0} max={1} step={0.01} value={slotsLuck} onInput={event => {
                    setSlotsLuck(event.target.value);
                }}/>
                <textarea className={classNames(sassmod.cardField, sassutil.sizeUnchangeable)}/>
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