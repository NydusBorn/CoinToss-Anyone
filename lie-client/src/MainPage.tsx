import React from "react";
import sassmod from "./MainPage.module.scss"
import SettingsPage from "./SettingsPage.tsx";
import * as utility from "./Utility.ts";

function MainPage(){
    const [showCoinToss, setShowCoinToss] = React.useState(true);
    const [showSlots, setShowSlots] = React.useState(true);
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
                    setShowSlots(true);
                    setShowSettings(true);
                }}>
                    Coin Toss
                </button>
                <button className={sassmod.sidebarButton} onClick={()=>{
                    setShowCoinToss(true);
                    setShowSlots(false);
                    setShowSettings(true);
                }}>
                    Slots
                </button>
                <div className={sassmod.sidebarSpacer}/>
                <div>
                    <svg/>
                    <p>{currentCredits}</p>
                </div>
                <button className={sassmod.sidebarButton} onClick={()=>{
                    setShowCoinToss(true);
                    setShowSlots(true);
                    setShowSettings(false);
                }}>
                    Settings
                </button>
            </div>
            <div className={sassmod.pageSplitter}/>
            <div className={sassmod.pageContainer}>
                <div hidden={showCoinToss}>
                    {/*TODO: Coin toss game page */}
                </div>
                <div hidden={showSlots}>
                    {/*TODO: Slots game page*/}
                </div>
                <div hidden={showSettings}>
                    <SettingsPage/>
                </div>
            </div>
        </div>
    )
}

export default MainPage;