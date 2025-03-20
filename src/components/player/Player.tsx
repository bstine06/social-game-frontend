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
import { GameData } from "../types/GameDataTypes";
import PlayersJoinedDisplay from "../common/PlayersJoinedDisplay";
import HostLobby from "../host/HostLobby";
import PreQuestion from "../common/PreRoundInstructions";
import { getGameStateByGameIdApi } from "../../api/gameApi";
import PreRoundInstructions from "../common/PreRoundInstructions";
import HostScore from "../host/HostScore";
import PlayerScore from "./PlayerScore";
import { useGame } from "../../contexts/GameContext";

interface PlayerProps {
    playerId: string;
    onCancelPlayer: (message?: string) => void;
    isHostPlayer?: boolean;
}

const Player: React.FC<PlayerProps> = ({
    playerId,
    onCancelPlayer,
    isHostPlayer
}) => {

    const { gameData } = useGame();

    const [deletePlayerConfirmMsg, setDeletePlayerConfirmMsg] = useState<string>(
        `This will remove you from the game (${gameData.gameId})`
    )
    const [players, setPlayers] = useState<PlayerData[]>([]);
    const [finished, setFinished] = useState<boolean>(false);
    const [isLeader, setIsLeader] = useState<boolean>();

    useEffect(() => {
        setFinished(false);
    }, [gameData.gameState]);

    useEffect(() => {
        if (playerId && players !== undefined) {
            console.log("useEffect triggered:", { playerId, players });
            updatePlayers(players);
        }
    }, [playerId, players]);

    // this hook will serve as a failsafe for edge cases where players do not
    // update past the finished/ waiting screen
    useEffect(() => {
        const ensureMatchingGameState =  async () => {
            const gameStateFromServer = await getGameStateByGameIdApi(gameData.gameId);
            if (gameStateFromServer.gameState === gameData.gameState) return;
            setFinished(false);
        }

        ensureMatchingGameState();
    }, [finished])

    const updatePlayers = (newPlayersList: PlayerData[]) => {
        setPlayers(newPlayersList);
        // return early if playerId or players array is not properly set yet.
        console.log("new players.length: ", newPlayersList.length);
        console.log("playerId: ", playerId);

        if (!playerId || newPlayersList.length < 1) return;
        setDeletePlayerConfirmMsg(
            decideDeletePlayerConfirmMsg(newPlayersList.length, gameData.gameId)
        );
        
        console.log(playerId);
        console.log(newPlayersList);
        // Find the local player in the updated players list
        const localPlayer = newPlayersList.find(
            (p) => p.player.playerId === playerId
        );

        // if the local player is not found 
        // or there is no players array
        // in the players list, youve been deleted!!
        if (!localPlayer || newPlayersList.length < 1) {
            onCancelPlayer(`You were removed from the game (${gameData.gameId})`);
        }

        // If the local player is found and ready, set finished to true
        if (localPlayer && localPlayer.ready) {
            setFinished(true);
        } else {
            setFinished(false);
        }

        // If the local player is the leader, set leader to true
        if (localPlayer && localPlayer.leader) {
            setIsLeader(true);
        } else {
            setIsLeader(false);
        }
    };

    const decideDeletePlayerConfirmMsg = (playerCount: number, gameId: string) => {
        if (isHostPlayer) return `You're the host, this will delete the game (${gameData.gameId})`;
        if (playerCount == 3 && gameData.gameState != "LOBBY") {
            return `Because there are only 3 players, this will delete the game (${gameData.gameId})`;
        }
        else {
            return `This will remove you from the game (${gameData.gameId})`;
        }
    };

    const handleFinishSubmission = () => {
        const playersStillSubmitting = players.filter(p => !p.ready);
        if (playersStillSubmitting.length > 1) {
            setFinished(true);
            return;
        }
        if ((playersStillSubmitting.length > 0 && playersStillSubmitting[0].player.playerId === playerId) || playersStillSubmitting.length === players.length) {
            setFinished(false);
            return;
        }
    };

    const renderGameplayComponent = () => {
        if (isLeader === null) {
            // Render nothing or a loading indicator until isLeader is set
            return <Waiting message={"LOADING"} description={""} />;
        }

        switch (gameData.gameState) {
            case "LOBBY": {
                if (isHostPlayer) {
                    return (
                        <HostLobby players={players} unremovablePlayerId={playerId}/>
                    )
                }
                if (isLeader) {
                    return (
                        <>
                            <StartGame playerCount={players.length} gameData={gameData}/>
                            {players.length !== 0 && <div className="container">
                                <PlayersJoinedDisplay playerData={players} gameData={gameData} unremovablePlayerId={playerId} hostPrivileges={true}/>
                            </div>}
                            
                        </>
                    )
                } else {
                    return (
                        <>
                            <Waiting 
                                message={"WAITING"}
                                description={"for the game to start"}
                            />
                            {players.length !== 0 && <div className="container">
                                <PlayersJoinedDisplay playerData={players} gameData={gameData}/>
                            </div>}
                        </>
                    )
                }
            }
            case "PRE_QUESTION":
            case "PRE_ANSWER":
            case "PRE_VOTE": {
                return (
                    <PreRoundInstructions/>
                )
            }
            case "QUESTION": {
                return (
                    <PlayerQuestion
                        onFinishSubmission={handleFinishSubmission}
                    />
                );
            }
            case "ANSWER": {
                return (
                    <PlayerAnswer
                        onFinishSubmission={handleFinishSubmission}
                    />
                );
            }
            case "VOTE": {
                return <PlayerVote playerId={playerId} />;
            }
            case "SCORE": {
                if (isHostPlayer || isLeader) {
                    return <HostScore players={players}/>
                } else {
                    return <PlayerScore players={players}/>;
                }
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
                        description={"for these slowpokes"}
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
                role={isHostPlayer ? "HOSTPLAYER" : "PLAYER"}
                onCancel={deletePlayer}
                confirmModalContent={deletePlayerConfirmMsg}
            />
            <WatchPlayers onPlayersChanged={updatePlayers} onError={onCancelPlayer}/>
            {finished ? renderWaitingComponent() : renderGameplayComponent()}
        </>
    );
};

export default Player;
