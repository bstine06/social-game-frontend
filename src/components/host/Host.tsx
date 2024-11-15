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

interface HostProps {
    gameData: GameData;
    onCancelHost: () => void;
    onStartGame: () => void;
}

const Host: React.FC<HostProps> = ({
    gameData,
    onCancelHost,
    onStartGame
}) => {
    const [players, setPlayers] = useState<PlayerData[]>([]);

    const updatePlayers = (newPlayersList: PlayerData[]) => {
        setPlayers(newPlayersList);
    };

    const handleStartGame = () => {
        if (players.length < 3) return;
        onStartGame();
    };

    const renderComponent = () => {
        switch (gameData.gameState) {
            case "LOBBY": {
                return (
                    <HostLobby
                        gameId={gameData.gameId}
                        onStartGame={handleStartGame}
                        players={players}
                    />
                );
            }
            case "QUESTION":
                return <HostQuestion players={players} />;
            case "ASSIGN":
                return <p>Loading...</p>;
            case "ANSWER":
                return <HostAnswer players={players} />;
            case "FIND_BALLOT":
                return <p>Loading...</p>;
            case "DISPLAY_BALLOT":
            case "VOTE":
                return (
                    <HostDisplayBallot
                        gameId={gameData.gameId}
                        displayingVotes={false}
                    />
                );
            case "DISPLAY_VOTES":
                return (
                    <HostDisplayBallot gameId={gameData.gameId} displayingVotes={true} />
                );
            case "SCORE":
                return <HostScore gameId={gameData.gameId} />;
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
            <WatchPlayers gameId={gameData.gameId} onPlayersChanged={updatePlayers} />
            {renderComponent()}
        </>
    );
};

export default Host;
