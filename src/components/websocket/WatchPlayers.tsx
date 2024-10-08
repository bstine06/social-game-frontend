import React, { useEffect, useState } from 'react';
const websocketUrl = process.env.REACT_APP_WEBSOCKET_URL;

interface WatchPlayersProps {
    gameId: string;
    onPlayerCountChanged: (count: number) => void;
  }

const WatchPlayers: React.FC<WatchPlayersProps> = ({ gameId, onPlayerCountChanged }) => {
    const [playerNames, setPlayerNames] = useState<string[]>([]);
    
    useEffect(() => {
        console.log("mounting WatchPlayers (websocket)")
        // Establish WebSocket connection to the Spring Boot backend
        const socket = new WebSocket(`${websocketUrl}/watch-players?gameId=${gameId}`);

        // Listen for messages from the WebSocket and update accordingly
        socket.onmessage = (event) => {
            console.log(event.data); 
        };

        // Cleanup WebSocket connection when the component unmounts
        return () => {
            socket.close();
        };
    }, []);

    return (
        <div>
          <h3>players:</h3>
          <div className="watch-players">
            {playerNames.map((playerName, index) => (
              <p key={index}>{playerName}</p>
            ))}
          </div>
        </div>
      );
};

export default WatchPlayers;