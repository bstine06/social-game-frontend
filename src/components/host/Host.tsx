import React, { useEffect, useState } from "react";
import HostLobby from "./HostLobby";
import Header from "../common/Header";
import HostQuestion from "./HostQuestion";
import HostAnswer from "./HostAnswer";
import DisplayBallot from "../common/DisplayBallot";
import HostScore from "./HostScore";
import WatchPlayers from "../websocket/WatchPlayers";
import { deleteGameApi } from "../../api/gameApi";
import { PlayerData } from "../types/playerDataTypes";
import { GameData } from "../types/GameDataTypes";
import { useSound } from "../../contexts/SoundContext"
import { useGame } from "../../contexts/GameContext";
import PreRoundInstructions from "../common/PreRoundInstructions";

interface HostProps {
    onCancelHost: (message?: string) => void;
}

const Host: React.FC<HostProps> = ({
    onCancelHost
}) => {
    const [players, setPlayers] = useState<PlayerData[]>([]);
    const { isSoundEnabled, setSong, playSound } = useSound();
    const { gameData, updateGameData } = useGame();

    const updatePlayers = (newPlayersList: PlayerData[]) => {
        setPlayers(newPlayersList);
    };

    useEffect(() => {
        if (isSoundEnabled) {
            switch (gameData.gameState) {
                case "LOBBY": setSong('lobby'); break;
                case "QUESTION": setSong('game1'); break;
            }
        }
    }, [gameData, isSoundEnabled]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const renderComponent = () => {
        switch (gameData.gameState) {
            case "LOBBY": {
                return (
                    <HostLobby
                        players={players}
                    />
                );
            }
            case "PRE_QUESTION":
            case "PRE_ANSWER":
            case "PRE_VOTE": {
                return (
                    <PreRoundInstructions />
                )
            }
            case "QUESTION":
                return <HostQuestion players={players}/>;
            case "ASSIGN":
                return <p>Loading...</p>;
            case "ANSWER":
                return <HostAnswer players={players} />;
            case "FIND_BALLOT":
                return;
            case "DISPLAY_BALLOT":
            case "VOTE":
            case "DISPLAY_VOTES":
                return (
                    <DisplayBallot />
                );
            case "SCORE":
                return <HostScore players={players} />;
            default: {
            }
        }
    };

    const deleteGame = async () => {
        try {
            await deleteGameApi(gameData.gameId);
            onCancelHost(); //Notify parent that the host is cancelled
        } catch (error) {
            console.error("Error deleting game", error);
        }
    };

    return (
        <>
            <Header
                onCancel={deleteGame}
                role={"HOST"}
                confirmModalContent={`This will delete the game (${gameData.gameId})`}
            />
            <WatchPlayers onError={onCancelHost} onPlayersChanged={updatePlayers} />
            {renderComponent()}
        </>
    );
};

export default Host;
