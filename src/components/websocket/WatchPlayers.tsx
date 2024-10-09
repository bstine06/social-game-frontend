import React, { useEffect, useState } from 'react';
import ErrorModal from '../common/ErrorModal';

const websocketUrl = process.env.REACT_APP_WEBSOCKET_URL;

interface WatchPlayersProps {
    gameId: string;
    onPlayerCountChanged: (count: number) => void;
  }

const WatchPlayers: React.FC<WatchPlayersProps> = ({
  gameId,
  onPlayerCountChanged,
}) => {
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    console.log("mounting WatchPlayers (websocket)");
    // Establish WebSocket connection to the Spring Boot backend
    const socket = new WebSocket(
      `${websocketUrl}/watch-players?gameId=${gameId}`
    );

    // Listen for messages from the WebSocket and update accordingly
    socket.onmessage = (event) => {
      try {
        const parsedData: string[] = JSON.parse(event.data);
        setPlayerNames(parsedData);
        onPlayerCountChanged(parsedData.length);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    // Cleanup WebSocket connection when the component unmounts
    return () => {
      socket.close();
    };
  }, []);

  const closeErrorModal = () => {
    setErrorMessage("");
  };

  return (
    <>
      <div>
        <h3>players:</h3>
        <div className="watch-players">
          {playerNames.map((playerName, index) => (
            <p key={index}>{playerName}</p>
          ))}
        </div>
      </div>
      {errorMessage && (
        <ErrorModal
          message={"There was an error communicating with the server."}
          onClose={closeErrorModal}
        />
      )}
    </>
  );
};

export default WatchPlayers;