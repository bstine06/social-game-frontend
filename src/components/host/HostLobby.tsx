import React, { useState } from "react";
const frontendUrl = process.env.REACT_APP_FRONTEND_URL;
import { PlayerData } from "../types/playerDataTypes";
import PlayerReadyDisplay from "../common/PlayerReadyDisplay";
import QRCodeGenerator from "./QRCodeGenerator";

// Define the type for the props
interface HostLobbyProps {
  gameId: string;
  players: PlayerData[];
  onStartGame: () => void;
}

const HostLobby: React.FC<HostLobbyProps> = ({
    gameId,
    players,
    onStartGame,
}) => {
    return (
        <>
            <div className="invisible-container">
                <div className="container invisible-box shrink-to-fit">
                    <QRCodeGenerator gameId={gameId} />
                    

                    {/* <p className="instruction">{`Players, go to ${frontendUrl} and press join.`}</p>
        <p className="instruction">Then, enter {gameId} to join this game</p> */}
                    <p className="instruction small">or, use this game ID:</p>
                    <h2 className="reduced-margin-top">{gameId}</h2>
                </div>
                <div className="container invisible-box expand-to-fit top-align">
                  <button
                        className="big-button"
                        disabled={players.length < 3}
                        onClick={onStartGame}
                    >
                        Start Game
                    </button>
                    <h2>Players:</h2>
                    <PlayerReadyDisplay players={players} showStatus={false} />
                </div>
            </div>
        </>
    );
};

export default HostLobby;
