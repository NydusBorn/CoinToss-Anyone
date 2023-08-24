import React from "react";
import sassmod from "./SettingsPage.module.scss";
import sassutil from "./Utility.module.scss"
import classNames from "classnames";

function SettingsPage() {
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
                <textarea className={classNames(sassmod.cardField, sassutil.sizeUnchangeable)}></textarea>
            </div>
            <div className={sassmod.card}>
                <p className={sassmod.cardDescriptor}>
                    {"Slots luck - likelihood of a positive outcome. "}
                    <br />
                    {"Values greater than 0.5 should result in long term positive results."}
                </p>
                <div className={sassmod.cardSpacer}/>
                <textarea className={classNames(sassmod.cardField, sassutil.sizeUnchangeable)}></textarea>
            </div>
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