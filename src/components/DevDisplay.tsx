import React from "react";

interface DevDisplayProps {
    gameId: string;
    gameState: string;
    role: string;
    playerId: string;
    hostId: string;
    loading: boolean;
    connected: boolean;
    color: string;
}

const DevDisplay: React.FC<DevDisplayProps> = ({gameId, gameState, role, playerId, hostId, loading, connected, color}) => {


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
        <pre>color: {color}</pre>
      </div>
    );

}

export default DevDisplay;