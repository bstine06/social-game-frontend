import React from "react";
import { GameState } from "./types/GameDataTypes";

interface DevDisplayProps {
    gameId: string;
    gameState: GameState;
    role: string;
    playerId: string;
    hostId: string;
    loading: boolean;
    connected: boolean;
}

const DevDisplay: React.FC<DevDisplayProps> = ({gameId, gameState, role, playerId, hostId, loading, connected}) => {


    return (
        <div id="developer-info">
        <pre>DEVELOPER INFO</pre>
        <pre>gameId : {gameId || "none"}</pre>
        <pre>gameState : {gameState || "none"}</pre>
        <pre>role: {role}</pre>
        <pre>playerId : {playerId ? playerId : "none"}</pre>
        <pre>hostId : {hostId ? hostId : "none"}</pre>
        <pre>connected: {connected ? "true" : "false"}</pre>
        <pre>loading: {loading ? 'true' : 'false'}</pre>
      </div>
    );

}

export default DevDisplay;