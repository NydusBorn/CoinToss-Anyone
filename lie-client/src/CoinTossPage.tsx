import React from "react";
import sassmod from "./CoinTossPage.module.scss";
import sassutil from "./Utility.module.scss"
import classNames from "classnames";
import * as utility from "./Utility.ts"

function CoinTossPage(){
    
    const tailsCoin = "src/assets/TailsCoin.png";
    const headsCoin = "src/assets/HeadsCoin.png";
    const [currentCoin, setCurrentCoin] = React.useState(tailsCoin);
    const [perceivedName, setPerceivedName] = React.useState("");
    const [lastCreditChange, setLastCreditChange] = React.useState(0);
    const [currentBet, setCurrentBet] = React.useState(1);
    
    async function loadValues(){
        setPerceivedName(await utility.apiGet<string>(`http://localhost:8080/user/getName?username=${localStorage.getItem("login")}&password=${localStorage.getItem("password")}`));
    }
    void loadValues();
    
    const starterMessage = `User '${perceivedName}' has made no actions yet.`;
    const loseMessage = `User '${perceivedName}' has lost the coin toss and lost ${Math.abs(lastCreditChange)} credits.`;
    const winMessage = `User '${perceivedName}' has won the coin toss and won ${Math.abs(lastCreditChange)} credits.`;
    
    const [currentMessage, setCurrentMessage] = React.useState(starterMessage);
    
    async function makeToss(betHead: boolean){
        const params = new Map<string, string>();
        params.set("username", localStorage.getItem("login")!);
        params.set("password", localStorage.getItem("password")!);
        if (betHead){
            params.set("betHeads", "True");
        }
        else{
            params.set("betHeads", "Fails");
        }
        params.set("betAmount", currentBet.toString());
        const response = await utility.apiPost<number>("http://localhost:8080/coinToss", utility.prepareMap(params));
        localStorage.setItem("requireRefresh", "Yes");
        setLastCreditChange(response);
        if (betHead){
            if (response > 0){
                setCurrentCoin(headsCoin);
                setCurrentMessage(winMessage);
            }
            else{
                setCurrentCoin(tailsCoin);
                setCurrentMessage(loseMessage);
            }
        }
        else{
            if (response > 0){
                setCurrentCoin(tailsCoin);
                setCurrentMessage(winMessage);
            }
            else{
                setCurrentCoin(headsCoin);
                setCurrentMessage(loseMessage);
            }
        }
    }
    
    return(
        <div className={sassmod.coinTossPage}>
            <img className={sassmod.coin} src={currentCoin} />
            <div className={sassmod.actionContainer}>
                <button onClick={()=>void makeToss(true)}>Bet on Heads</button>
                <div className={sassmod.actionDivider}/>
                <button onClick={()=>void makeToss(false)}>Bet on Tails</button>
            </div>
            <textarea className={classNames(sassutil.sizeUnchangeable, sassmod.betField)} onChange={event => {
                const bet = parseInt(event.target.value);
                if (isNaN(bet) || bet < 1) {
                    event.target.className = classNames(sassmod.betField, sassmod.betFieldError, sassmod.loseHighlight);
                }
                else {
                    event.target.className = classNames(sassmod.betField, sassmod.betFieldError);
                    setCurrentBet(bet);
                }
            }}/>
            <p>{currentMessage}</p>
        </div>
    )
}

export default CoinTossPage; 