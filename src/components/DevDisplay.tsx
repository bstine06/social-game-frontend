import React from "react";

interface DevDisplayProps {
    gameId: string;
    gameState: string;
    role: string;
    hostId?: string;
    playerId?: string;
    loading: boolean;
    color: string;
}

const DevDisplay: React.FC<DevDisplayProps> = ({gameId, gameState, role, hostId, playerId, loading, color}) => {


    return (
        <div id="developer-info">
        <pre>DEVELOPER INFO</pre>
        <pre>gameId : {gameId || "none"}</pre>
        <pre>gameState : {gameState || "none"}</pre>
        <pre>role: {role}</pre>
        <pre>id : {hostId ? hostId: playerId ? playerId : "none"}</pre>
        <pre>loading: {loading ? 'true' : 'false'}</pre>
        <pre>color: {color}</pre>
      </div>
    );

}

export default DevDisplay;