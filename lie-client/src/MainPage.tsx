import React from "react";
import sassmod from "./MainPage.module.scss"
import SettingsPage from "./SettingsPage.tsx";

function MainPage(){
    const [showCoinToss, setShowCoinToss] = React.useState(true);
    const [showSlots, setShowSlots] = React.useState(true);
    const [showSettings, setShowSettings] = React.useState(false);
    
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