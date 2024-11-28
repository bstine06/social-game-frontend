import React, { useEffect, useRef, useState } from 'react';
import { GameData } from '../types/GameDataTypes';

const websocketUrl = process.env.REACT_APP_WEBSOCKET_URL;

interface GameStateProps {
    onGameDataUpdate: (gameStateData: GameData) => void;
    gameId: string;
}

const GameState: React.FC<GameStateProps> = ({ onGameDataUpdate, gameId }) => {
    const socketRef = useRef<WebSocket | null>(null);
    const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);
    const [retries, setRetries] = useState<number>(0);

    const limit_retries = 5;

    const connectWebSocket = () => {
        if (!gameId) {
            //return if gameId is not set.
            return;
        }

        // If the number of retries exceeds the limit, do not attempt to reconnect
        if (retries >= limit_retries) {
            console.error(`Max retries reached: ${limit_retries}. No more reconnections.`);
            return;
        }

        // Clear any existing reconnect attempts
        if (reconnectTimeout.current) {
            clearTimeout(reconnectTimeout.current);
            reconnectTimeout.current = null;
        }

        const socket = new WebSocket(`${websocketUrl}/game-updates?gameId=${gameId}`);
        socketRef.current = socket;

        // Listen for messages from the WebSocket and update the parent component
        socket.onmessage = (event) => {
            setRetries(0); // websocket is good, reset the retry limit
            console.log(event.data);
            try {
                const parsedData: GameData = JSON.parse(event.data);
                onGameDataUpdate(parsedData);
            } catch (error) {
                console.error("ERROR GAMESTATE WEBSOCKET:", error);
                console.error("Failed to parse WebSocket message data:", event.data);
            }
        };

        // Listen for the close event and handle it
        socket.onclose = (event) => {
            console.log(`WebSocket closed with code: ${event.code}`);
            if (event.code >= 1002 && event.code <= 2999 && retries < limit_retries) {
                // WebSocket closed unexpectedly, attempt to reconnect only if retry limit is not exceeded
                console.log("WebSocket closed unexpectedly, attempting to reconnect...");
                reconnectTimeout.current = setTimeout(() => {
                    setRetries((prev) => prev + 1); // Increment retries before reconnect
                    connectWebSocket();
                }, 3000); // 3-second delay before reconnecting
            } else if (retries >= limit_retries) {
                console.log("Reached retry limit, no more reconnect attempts.");
            }
        };

        // Handle connection errors
        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };
    };

    useEffect(() => {
        if (!gameId) {
            if (socketRef.current) {
                socketRef.current.close();
            }
            return;
        }
    
        connectWebSocket();
    
        return () => {
            if (socketRef.current && socketRef.current.readyState !== WebSocket.CLOSED) {
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


