import React, { useEffect, useRef } from 'react';

const websocketUrl = process.env.REACT_APP_WEBSOCKET_URL;

interface GameStateProps {
    onGameStateUpdate: (gameState: string) => void;
    gameId: string;
}

const GameState: React.FC<GameStateProps> = ({ onGameStateUpdate, gameId }) => {
    const socketRef = useRef<WebSocket | null>(null);
    const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);

    const connectWebSocket = () => {
        // Clear any existing reconnect attempts
        if (reconnectTimeout.current) {
            clearTimeout(reconnectTimeout.current);
            reconnectTimeout.current = null;
        }

        const socket = new WebSocket(`${websocketUrl}/game-updates?gameId=${gameId}`);
        socketRef.current = socket;

        // Listen for messages from the WebSocket and update the parent component
        socket.onmessage = (event) => {
            console.log(event.data);
            onGameStateUpdate(event.data);  // Invoke the callback passed via props
        };

        // Listen for the close event and handle it
        socket.onclose = (event) => {
            console.log(`WebSocket closed with code: ${event.code}`);
            if (event.code === 1006) {
                console.log("WebSocket closed unexpectedly (code 1006), attempting to reconnect...");
                // Attempt to reconnect after a delay
                reconnectTimeout.current = setTimeout(() => {
                    connectWebSocket();
                }, 3000); // 3-second delay before reconnecting
            } else if (event.code === 4000) {
                onGameStateUpdate("NONEXISTENT");
            } else {
                onGameStateUpdate("");
            }
        };

        // Handle connection errors
        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };
    };

    useEffect(() => {
        // Establish initial WebSocket connection
        connectWebSocket();

        // Cleanup WebSocket connection and reconnect timeout on component unmount
        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
            if (reconnectTimeout.current) {
                clearTimeout(reconnectTimeout.current);
            }
        };
    }, [gameId]);

    return null; // No JSX rendering needed
};

export default GameState;

