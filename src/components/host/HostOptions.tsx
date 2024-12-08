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
                <p className="subheading">Game Options</p>
                <p className="description">how will you be using this device?</p>
                <div className="options-container">
                    <div className={`flex-split option btn ${!gameOptions.isHostPlayer ? "selected" : ""}`} onClick={toggleIsHostPlayer}>
                        <TvWithPhonesSVG />
                        <div>
                        <p className="subheading">
                            Party Screen
                        </p>
                        <p className="description">
                            Classic party play. This will be a common screen for all players.
                        </p>
                        </div>
                    </div>
                    <div className={` flex-split option btn ${gameOptions.isHostPlayer ? "selected" : ""}`} onClick={toggleIsHostPlayer}>
                        <PhonesSVG />
                        <div>
                        <p className="subheading">
                            Solo Screen
                        </p>
                        <p className="description">
                            I'll play on this device. We won't have a party screen for everyone.
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