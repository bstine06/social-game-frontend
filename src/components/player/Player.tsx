import React, { useState, useEffect } from "react";
import Header from "../common/Header";
import PlayerQuestion from "./PlayerQuestion";
import PlayerVote from "./PlayerVote";
import { deletePlayerApi } from "../../api/playerApi";
import PlayerAnswer from "./PlayerAnswer";
import WatchPlayers from "../websocket/WatchPlayers";
import { PlayerData } from "../types/playerDataTypes";
import PlayerReadyDisplay from "../common/PlayerReadyDisplay";

interface PlayerProps {
    gameId: string;
    playerId: string;
    gameState: string;
    playerName: string;
    onCancelPlayer: () => void;
}

const Player: React.FC<PlayerProps> = ({
    gameId,
    playerId,
    gameState,
    playerName,
    onCancelPlayer,
}) => {
    const [deletePlayerConfirmMsg, setDeletePlayerConfirmMsg] = useState<string>(
        `This will remove you from the game (${gameId})`
    )
    const [players, setPlayers] = useState<PlayerData[]>([]);
    const [finished, setFinished] = useState<boolean>(false);

    useEffect(() => {
        setFinished(false);
    }, [gameState]);

    const updatePlayers = (newPlayersList: PlayerData[]) => {
        setPlayers(newPlayersList);
        setDeletePlayerConfirmMsg(
            decideDeletePlayerConfirmMsg(newPlayersList.length, gameId)
        );
        // Find the local player in the updated players list
        const localPlayer = newPlayersList.find(
            (p) => p.player.playerId === playerId
        );

        // If the local player is found and ready, set finished to true
        if (localPlayer && localPlayer.ready) {
            setFinished(true);
        } else {
            setFinished(false);
        }
    };

    const decideDeletePlayerConfirmMsg = (playerCount: number, gameId: string) => {
        return playerCount === 3
            ? `Because there are only 3 players, this will delete the game (${gameId})`
            : `This will remove you from the game (${gameId})`;
    };

    const handleFinishSubmission = () => {
        const playersStillSubmitting = players.filter(p => !p.ready);
        console.log(playersStillSubmitting);
        if (playersStillSubmitting.length > 1) {
            setFinished(true);
        } else if (playersStillSubmitting.length > 0 && playersStillSubmitting[0].player.playerId === playerId) {
            setFinished(false);
        }
    };

    const renderGameplayComponent = () => {
        switch (gameState) {
            case "LOBBY": {
                return <p> waiting for the game to start... </p>;
            }
            case "QUESTION": {
                return (
                    <PlayerQuestion
                        gameId={gameId}
                        onFinishSubmission={handleFinishSubmission}
                    />
                );
            }
            case "ANSWER": {
                return (
                    <PlayerAnswer
                        gameId={gameId}
                        onFinishSubmission={handleFinishSubmission}
                    />
                );
            }
            case "VOTE": {
                return <PlayerVote gameId={gameId} playerId={playerId} />;
            }
            default: {
            }
        }
    };

    const renderWaitingComponent = () => {
        const playersStillWaiting = players.filter(p => !p.ready);

        if (playersStillWaiting.length === 0) {
            return null;
        } else {
            // Some players are still not finished
            return <PlayerReadyDisplay players={playersStillWaiting} />;
        }
    };

    const deletePlayer = async () => {
        try {
            await deletePlayerApi();
            onCancelPlayer(); //Notify parent that the player is cancelled
        } catch (error) {
            console.error("Error deleting player", error);
        }
    };

    return (
        <>
            <Header
                gameId={gameId}
                playerName={playerName}
                role={"PLAYER"}
                onCancel={deletePlayer}
                confirmModalContent={deletePlayerConfirmMsg}
            />
            <WatchPlayers gameId={gameId} onPlayersChanged={updatePlayers} />
            {finished ? renderWaitingComponent() : renderGameplayComponent()}
        </>
    );
};

export default Player;
