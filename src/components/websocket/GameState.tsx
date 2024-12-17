import React, { useEffect, useRef, useState } from 'react';
import { GameData } from '../types/GameDataTypes';

const websocketUrl = process.env.REACT_APP_WEBSOCKET_URL;

interface GameStateProps {
    onGameDataUpdate: (gameStateData: GameData) => void;
    onError: (message: string)=>void;
    gameId: string;
}

const GameState: React.FC<GameStateProps> = ({ onGameDataUpdate, onError, gameId }) => {
    const socketRef = useRef<WebSocket | null>(null);
    const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);
    const retriesRef = useRef<number>(0); // Ref to track retry count

    const limit_retries = 5;

    const connectWebSocket = () => {
        if (!gameId) {
            //return if gameId is not set.
            return;
        }

        // If the number of retries exceeds the limit, do not attempt to reconnect
        if (retriesRef.current >= limit_retries) {
            onError(`There was an error connecting to the game server.`);
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
            retriesRef.current = 0; // websocket is good, reset the retry limit
            try {
                const parsedData: GameData = JSON.parse(event.data);
                onGameDataUpdate(parsedData);
            } catch (error) {
                onError(`There was an error receiving updates from the game server.`);
            }
        };

        // Listen for the close event and handle it
        socket.onclose = (event) => {
            if (event.code >= 1002 && event.code <= 2999 && retriesRef.current < limit_retries) {
                // WebSocket closed unexpectedly, attempt to reconnect only if retry limit is not exceeded
                reconnectTimeout.current = setTimeout(() => {
                    retriesRef.current += 1; // Increment retries before reconnect
                    connectWebSocket();
                }, 3000); // 3-second delay before reconnecting
            }
        };

        // Handle connection errors
        socket.onerror = (error) => {
            // console.error("WebSocket error:", error);
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


