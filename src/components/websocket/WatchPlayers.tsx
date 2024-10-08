import React, { useEffect, useState, useRef } from 'react';
import ErrorModal from '../common/ErrorModal';
import { WatchPlayersData, PlayerData } from '../types/playerDataTypes';

const websocketUrl = process.env.REACT_APP_WEBSOCKET_URL;

interface WatchPlayersProps {
    gameId: string;
    onPlayersChanged: (players: PlayerData[]) => void;
}

const WatchPlayers: React.FC<WatchPlayersProps> = ({
    gameId,
    onPlayersChanged,
}) => {
    const [players, setPlayers] = useState<PlayerData[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const socketRef = useRef<WebSocket | null>(null);
    const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);

    const connectWebSocket = () => {
        // Clear any existing reconnect attempts
        if (reconnectTimeout.current) {
            clearTimeout(reconnectTimeout.current);
            reconnectTimeout.current = null;
        }

        const socket = new WebSocket(`${websocketUrl}/watch-players?gameId=${gameId}`);
        socketRef.current = socket;

        // Listen for messages from the WebSocket and update accordingly
        socket.onmessage = (event) => {
            console.log(event.data);
            try {
                const parsedData: WatchPlayersData = JSON.parse(event.data);
                setPlayers(parsedData.players);
                onPlayersChanged(parsedData.players);
            } catch (error) {
                setErrorMessage("There was an error communicating with the server.");
            }
        };

        // Listen for the close event and handle it
        socket.onclose = (event) => {
            if (event.code >= 1002 && event.code <=2999) {
                //console.log("WebSocket closed unexpectedly attempting to reconnect...");
                // Attempt to reconnect after a delay
                reconnectTimeout.current = setTimeout(() => {
                    connectWebSocket();
                }, 3000); // 3-second delay before reconnecting
            } else {
                setErrorMessage("Connection closed. Please refresh the page.");
            }
        };

        // Handle connection errors
        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
            setErrorMessage("WebSocket error occurred.");
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

    const closeErrorModal = () => {
        setErrorMessage("");
    };

    return null;
};

export default WatchPlayers;
