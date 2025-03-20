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

type HostOption = 'NONE' | 'PARTY_VIEW' | 'PLAYER_VIEW'

const HostOptions: React.FC<HostOptionsProps> = ({onCreateGameAsHost, onCancelHost}) => {
    const [selection, setSelection] = useState<HostOption>("NONE");
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
        }));
        newValue ? setSelection("PLAYER_VIEW") : setSelection("PARTY_VIEW");
    }

    const onCreateGame = () => {
        onCreateGameAsHost(gameOptions);
    }

    // const dummyGameData : GameData = {
    //     gameId: "",
    //     gameState: null,
    //     timerEnd: null,
    //     roundCount: 0
    // }

    return (
        <>
            <Header 
                onCancel={onCancelHost}
                role={"CREATE GAME"}
                confirmModalContent="Your changes will not be saved"
            />
            <div className="container">
                <p className="subheading">Host Options</p>
                <div className="options-container">
                    <div className={`option btn ${selection === "PARTY_VIEW" ? "selected" : ""}`} onClick={() => setIsHostPlayer(false)}>
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
                    <div className={`option btn ${selection === "PLAYER_VIEW" ? "selected" : ""}`} onClick={() => setIsHostPlayer(true)}>
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
                <button disabled={selection === "NONE"} className="big-button" onClick={onCreateGame}>Create Game</button>
            </div>
        </>
    )

}

export default HostOptions;