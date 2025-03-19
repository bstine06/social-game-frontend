import React, { useEffect, useState } from "react";
import HostLobby from "./HostLobby";
import Header from "../common/Header";
import HostQuestion from "./HostQuestion";
import HostAnswer from "./HostAnswer";
import HostDisplayBallot from "./HostDisplayBallot";
import HostScore from "./HostScore";
import WatchPlayers from "../websocket/WatchPlayers";
import { deleteGameApi } from "../../api/gameApi";
import { PlayerData } from "../types/playerDataTypes";
import { GameData } from "../types/GameDataTypes";
import { useSound } from "../../contexts/SoundContext"
import PreRoundInstructions from "../common/PreRoundInstructions";

interface HostProps {
    gameData: GameData;
    onCancelHost: (message?: string) => void;
}

const Host: React.FC<HostProps> = ({
    gameData,
    onCancelHost
}) => {
    const [players, setPlayers] = useState<PlayerData[]>([]);
    const { isSoundEnabled, setSong, playSound } = useSound();

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
                        gameData={gameData}
                        players={players}
                    />
                );
            }
            case "PRE_QUESTION":
            case "PRE_ANSWER":
            case "PRE_VOTE": {
                return (
                    <PreRoundInstructions gameData={gameData}/>
                )
            }
            case "QUESTION":
                return <HostQuestion players={players} gameData={gameData}/>;
            case "ASSIGN":
                return <p>Loading...</p>;
            case "ANSWER":
                return <HostAnswer players={players} gameData={gameData}/>;
            case "FIND_BALLOT":
                return <p>Loading...</p>;
            case "DISPLAY_BALLOT":
            case "VOTE":
                return (
                    <HostDisplayBallot
                        gameData={gameData}
                        displayingVotes={false}
                    />
                );
            case "DISPLAY_VOTES":
                return (
                    <HostDisplayBallot gameData={gameData} displayingVotes={true}/>
                );
            case "SCORE":
                return <HostScore gameId={gameData.gameId} players={players} />;
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
                gameData={gameData}
                onCancel={deleteGame}
                role={"HOST"}
                confirmModalContent={`This will delete the game (${gameData.gameId})`}
            />
            <WatchPlayers gameId={gameData.gameId} onError={onCancelHost} onPlayersChanged={updatePlayers} />
            {renderComponent()}
        </>
    );
};

export default Host;
