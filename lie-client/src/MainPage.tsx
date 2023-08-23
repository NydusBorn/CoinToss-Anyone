import React from "react";
import "./MainPage.css"

function MainPage(){
    const [showCoinToss, setShowCoinToss] = React.useState(true);
    const [showSlots, setShowSlots] = React.useState(true);
    const [showSettings, setShowSettings] = React.useState(false);
    
    return(
        <>
            <div className={"sidebar"}>
                <button className={"sidebar-button"} onClick={()=>{
                    setShowCoinToss(false);
                    setShowSlots(true);
                    setShowSettings(true);
                }}>
                    Coin Toss
                </button>
                <button className={"sidebar-button"} onClick={()=>{
                    setShowCoinToss(true);
                    setShowSlots(false);
                    setShowSettings(true);
                }}>
                    Slots
                </button>
                <div className={"sidebar-spacer"}/>
                <button className={"sidebar-button"} onClick={()=>{
                    setShowCoinToss(true);
                    setShowSlots(true);
                    setShowSettings(false);
                }}>
                    Settings
                </button>
            </div>
            <div className={"page-container"}>
                <div hidden={showCoinToss}>
                    {/*TODO: Coin toss game page */}
                </div>
                <div hidden={showSlots}>
                    {/*TODO: Slots game page*/}
                </div>
                <div hidden={showSettings}>
                    {/*TODO: setting page page*/}
                </div>
            </div>
        </>
    )
}

export default MainPage;