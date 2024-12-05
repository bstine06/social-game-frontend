import React, { useState } from "react";
import Header from "../common/Header";
import { GameData, GameOptions } from "../types/GameDataTypes";

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

    const toggleIsHostPlayer = () => {
        setGameOptions((prevGameOptions: GameOptions) => ({
            ...prevGameOptions,
            isHostPlayer: !prevGameOptions.isHostPlayer
        }))
    }

    const onCreateGame = () => {
        onCreateGameAsHost(gameOptions);
    }

    const dummyGameData : GameData = {
        gameId: "",
        gameState: "",
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
                <h2>Game Options</h2>
                <p>how will you be using this device?</p>
                <div className="flex-split">
                    <button className={`big-button ${gameOptions.isHostPlayer ? "selected" : ""}`} onClick={toggleIsHostPlayer}>I'll be playing the game im hosting</button>
                    <button className={`big-button ${!gameOptions.isHostPlayer ? "selected" : ""}`} onClick={toggleIsHostPlayer}>This is a common screen for all players</button>
                </div>
                <p>timer duration:</p>
                <div className="flex-split">
                    <button className={`big-button ${gameOptions.timerDuration===30 ? "selected" : ""}`} onClick={()=> updateTimerDuration(30)}>30</button>
                    <button className={`big-button ${gameOptions.timerDuration===60 ? "selected" : ""}`} onClick={()=> updateTimerDuration(60)}>60</button>
                    <button className={`big-button ${gameOptions.timerDuration===90 ? "selected" : ""}`} onClick={()=> updateTimerDuration(90)}>90</button>
                </div>
                
                <button className="big-button" onClick={onCreateGame}>Create</button>
            </div>
        </>
    )

}

export default HostOptions;