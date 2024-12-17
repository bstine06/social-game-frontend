import React, { useEffect, useRef } from 'react';
import { WatchPlayersData, PlayerData } from '../types/playerDataTypes';

const websocketUrl = process.env.REACT_APP_WEBSOCKET_URL;

interface WatchPlayersProps {
    gameId: string;
    onPlayersChanged: (players: PlayerData[]) => void;
    onError: (message: string) => void;
}

const WatchPlayers: React.FC<WatchPlayersProps> = ({
    gameId,
    onPlayersChanged,
    onError,
}) => {
    const socketRef = useRef<WebSocket | null>(null);
    const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);
    const retriesRef = useRef<number>(0); // Ref to track retry count

    const limit_retries = 5;

    const connectWebSocket = () => {
        if (!gameId) {
            return; // Return if gameId is not set
        }

        if (retriesRef.current >= limit_retries) {
            onError(`Unable to connect to the server after multiple attempts.`);
            return;
        }

        if (reconnectTimeout.current) {
            clearTimeout(reconnectTimeout.current);
            reconnectTimeout.current = null;
        }

        try {
            const socket = new WebSocket(`${websocketUrl}/watch-players?gameId=${gameId}`);
            socketRef.current = socket;

            socket.onopen = () => {
                retriesRef.current = 0; // Reset retry count on successful connection
            };

            socket.onmessage = (event) => {
                try {
                    const parsedData: WatchPlayersData = JSON.parse(event.data);
                    onPlayersChanged(parsedData.players);
                } catch (error) {
                    onError(`There was an error receiving updates from the game server.`);
                }
            };

            socket.onclose = (event) => {
                if (event.code >= 1002 && event.code <= 2999 && retriesRef.current < limit_retries) {
                    reconnectTimeout.current = setTimeout(() => {
                        retriesRef.current += 1; // Increment retries before reconnect
                        connectWebSocket();
                    }, 3000); // Retry after 3 seconds
                } else if (retriesRef.current >= limit_retries) {
                    onError(`There was an error receiving updates from the game server.`);
                }
            };

            socket.onerror = () => {
                // Handle connection errors silently to avoid duplicate error messages
                // console.error('WebSocket encountered an error.');
            };
        } catch (error) {
            onError(`Failed to establish a connection to the server.`);
            reconnectTimeout.current = setTimeout(() => {
                retriesRef.current += 1; // Increment retries before reconnect
                connectWebSocket();
            }, 3000); // Retry after 3 seconds
        }
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

export default WatchPlayers;
