import React, { useState, useEffect } from "react";
import Header from "../common/Header";
import PlayerQuestion from "./PlayerQuestion";
import PlayerVote from "./PlayerVote";
import { deletePlayerApi } from "../../api/playerApi";
import PlayerAnswer from "./PlayerAnswer";
import WatchPlayers from "../websocket/WatchPlayers";
import { PlayerData } from "../types/playerDataTypes";
import PlayerReadyDisplay from "../common/PlayerReadyDisplay";
import Waiting from "../common/Waiting";
import StartGame from "../common/StartGame";

interface PlayerProps {
    gameId: string;
    playerId: string;
    gameState: string;
    onCancelPlayer: () => void;
}

const Player: React.FC<PlayerProps> = ({
    gameId,
    playerId,
    gameState,
    onCancelPlayer
}) => {
    const [deletePlayerConfirmMsg, setDeletePlayerConfirmMsg] = useState<string>(
        `This will remove you from the game (${gameId})`
    )
    const [players, setPlayers] = useState<PlayerData[]>([]);
    const [finished, setFinished] = useState<boolean>(false);
    const [isLeader, setIsLeader] = useState<boolean>();

    useEffect(() => {
        setFinished(false);
    }, [gameState]);

    useEffect(() => {
        updatePlayers(players);
    }, [playerId]);

    const updatePlayers = (newPlayersList: PlayerData[]) => {
        setPlayers(newPlayersList);
        // return early if playerId is not properly set yet.
        if (!playerId) return;
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
        console.log(localPlayer);

        // If the local player is the leader, set leader to true
        if (localPlayer && localPlayer.leader) {
            setIsLeader(true);
        } else {
            setIsLeader(false);
        }
    };

    const decideDeletePlayerConfirmMsg = (playerCount: number, gameId: string) => {
        if (playerCount == 3 && gameState != "LOBBY") {
            return `Because there are only 3 players, this will delete the game (${gameId})`;
        }
        else {
            return `This will remove you from the game (${gameId})`;
        }
    };

    const handleFinishSubmission = () => {
        const playersStillSubmitting = players.filter(p => !p.ready);
        if (playersStillSubmitting.length > 1) {
            setFinished(true);
        } else if (playersStillSubmitting.length > 0 && playersStillSubmitting[0].player.playerId === playerId) {
            setFinished(false);
        }
    };

    const renderGameplayComponent = () => {
        if (isLeader === null) {
            // Render nothing or a loading indicator until isLeader is set
            return <Waiting message={"LOADING"} description={""} />;
        }

        switch (gameState) {
            case "LOBBY": {
                console.log(isLeader);
                if (isLeader) {
                    return <StartGame playerCount={players.length} gameId={gameId}/>
                } else {
                    return (
                        <Waiting 
                            message={"WAITING"}
                            description={"for the game to start"}
                        />
                    )
                }
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
        const playersStillWaiting = players.filter((p) => !p.ready);

        if (playersStillWaiting.length === 0) {
            return null;
        } else {
            // Some players are still not finished
            return (
                <>
                    <Waiting
                        message={"WAITING"}
                        description={"(for these slowpokes)"}
                    />
                    <PlayerReadyDisplay players={playersStillWaiting} />
                </>
            );
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
