import React, { useEffect } from 'react';
const websocketUrl = process.env.REACT_APP_WEBSOCKET_URL;

interface GameStateProps {
    onGameStateUpdate: (gameState: string) => void;
    gameId: string;
}

const GameState: React.FC<GameStateProps> = ({ onGameStateUpdate, gameId }) => {
    useEffect(() => {
        // Establish WebSocket connection to the Spring Boot backend
        const socket = new WebSocket(`${websocketUrl}/game-updates?gameId=${gameId}`);

        // Listen for messages from the WebSocket and update the parent component
        socket.onmessage = (event) => {
            onGameStateUpdate(event.data);  // Invoke the callback passed via props
        };

        // Listen for the close event and handle it
        socket.onclose = (event) => {
            if (event.code === 4000) {
                onGameStateUpdate("NONEXISTENT");
            } else {
                onGameStateUpdate("");
            }
        };

        // Cleanup WebSocket connection when the component unmounts
        return () => {
            socket.close();
        };
    }, []);

    return null; // No JSX rendering needed
};

export default GameState;
