import React, { useState } from "react";
import Header from "../common/Header";
import { GameData, GameOptions } from "../types/GameDataTypes";
import TvWithPhonesSVG from "../../resources/TvWithPhonesSVG";
import '../../styles/choose-role.css';
import PhonesSVG from "../../resources/PhonesSVG";

interface HostOptionsProps {
    onCreateGameAsHost: (gameOptions: GameOptions)=>void;
    onCancelHost: ()=>void;
}

const HostOptions: React.FC<HostOptionsProps> = ({onCreateGameAsHost, onCancelHost}) => {

    const [gameOptions, setGameOptions] = useState<GameOptions>({
        timerDuration: 90,
        isHostPlayer: false
    });

    const updateTimerDuration = (newTimerDuration: number) => {
        setGameOptions((prevGameOptions: GameOptions) => ({
            ...prevGameOptions,
            timerDuration: newTimerDuration
        }));
    }

    const setIsHostPlayer = (newValue: boolean) => {
        setGameOptions((prevGameOptions: GameOptions) => ({
            ...prevGameOptions,
            isHostPlayer: newValue
        }))
    }

    const onCreateGame = () => {
        onCreateGameAsHost(gameOptions);
    }

    const dummyGameData : GameData = {
        gameId: "",
        gameState: null,
        timerEnd: null
    }

    return (
        <>
            <Header 
                onCancel={onCancelHost}
                role={"CREATE GAME"}
                gameData={dummyGameData}
                confirmModalContent="Your changes will not be saved"
            />
            <div className="container">
                <p className="subheading">Host Options</p>
                <p className="description">how will you use this device?</p>
                <div className="options-container">
                    <div className={`option btn ${!gameOptions.isHostPlayer ? "selected" : ""}`} onClick={() => setIsHostPlayer(false)}>
                    <p className="subheading view-option-name">
                            Party View
                        </p>
                        <div className="flex-split">
                        
                        </div>
                        <TvWithPhonesSVG />
                        <div>
                        
                        <p className="description">
                            Classic party play. This device will be a common screen for all players.
                        </p>
                        </div>
                    </div>
                    <div className={`option btn ${gameOptions.isHostPlayer ? "selected" : ""}`} onClick={() => setIsHostPlayer(true)}>
                    <p className="subheading view-option-name">
                            Player View
                        </p>
                        <div className="flex-split">
                        
                        </div>
                        <PhonesSVG />
                        <div>
                        
                        <p className="description">
                            I'll play on this device. We won't have a shared party view.
                        </p>
                        </div>
                    </div>
                </div>
                {/* <p className="description">timer duration:</p>
                <div className="flex-split">
                    <button className={`big-button ${gameOptions.timerDuration===30 ? "selected" : ""}`} onClick={()=> updateTimerDuration(30)}>30</button>
                    <button className={`big-button ${gameOptions.timerDuration===60 ? "selected" : ""}`} onClick={()=> updateTimerDuration(60)}>60</button>
                    <button className={`big-button ${gameOptions.timerDuration===90 ? "selected" : ""}`} onClick={()=> updateTimerDuration(90)}>90</button>
                </div> */}
                
                <button className="big-button" onClick={onCreateGame}>Create Game</button>
            </div>
        </>
    )

}

export default HostOptions;