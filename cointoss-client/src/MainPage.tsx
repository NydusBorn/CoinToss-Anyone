import React from "react";
import sassmod from "./MainPage.module.scss"
import SettingsPage from "./SettingsPage.tsx";
import * as utility from "./Utility.ts";
import CoinTossPage from "./CoinTossPage.tsx";

function MainPage(){
    const [showCoinToss, setShowCoinToss] = React.useState(true);
    const [showSettings, setShowSettings] = React.useState(false);
    let [currentCredits, setCurrentCredits] = React.useState(0);
    let [startedPolling, setStartedPolling] = React.useState(false);
    
    async function getCash(){
        if (startedPolling) return;
        localStorage.setItem("requireRefresh", "Yes");
        setStartedPolling(true);
        while (true){
            await utility.sleep(1000);
            if (localStorage.getItem('login') === null || localStorage.getItem('requireRefresh') === "No") continue;
            setCurrentCredits(await utility.apiGet<number>(`http://localhost:8080/user/cash?username=${localStorage.getItem('login')}&password=${localStorage.getItem('password')}`));
            localStorage.setItem('requireRefresh', "No");
        }
        
    }

    void getCash();
    
    return(
        <div className={sassmod.mainPage}>
            <div className={sassmod.sidebar}>
                <button className={sassmod.sidebarButton} onClick={()=>{
                    setShowCoinToss(false);
                    setShowSettings(true);
                }}>
                    Coin Toss
                </button>
                <div className={sassmod.sidebarSpacer}/>
                <div className={sassmod.creditsIndicator}>
                    <img src={"src/assets/TailsCoin.png"} className={sassmod.coin} alt={"An image of a coin"}/>
                    <p className={sassmod.creditsText}>{currentCredits}</p>
                </div>
                <button className={sassmod.sidebarButton} onClick={()=>{
                    setShowCoinToss(true);
                    setShowSettings(false);
                }}>
                    Settings
                </button>
            </div>
            <div className={sassmod.pageSplitter}/>
            <div className={sassmod.pageContainer}>
                <div hidden={showCoinToss}>
                    <CoinTossPage/>
                </div>
                <div hidden={showSettings}>
                    <SettingsPage/>
                </div>
            </div>
        </div>
    )
}

export default MainPage;