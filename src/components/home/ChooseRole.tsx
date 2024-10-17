import React from 'react';
import '../../styles/choose-role.css';
const gameName = process.env.REACT_APP_GAME_NAME;

// Define the type for the props
interface ChooseRoleProps {
  onChooseHost: () => void; // Function to handle hosting
  onChooseJoin: () => void; // Function to handle joining
}

const ChooseRole: React.FC<ChooseRoleProps> = ({ onChooseHost, onChooseJoin }) => {
  return (
    <div className="container">
      <div className="options-container">
        <div className="option btn" onClick={onChooseJoin}>
          <p className="option-name">JOIN</p>
          <p className="description">
            Choose this to join a game created by a host.
          </p>
          <p className="description">
            You'll enter a 4-character game id provided by the host device.
          </p>
        </div>
        <div className="option btn" onClick={onChooseHost}>
          <p className="option-name">HOST</p>
          <p className="description">
            Choose this to host a game.
          </p>
          <p className="description">
            The device that hosts will not be a participant in the game.
          </p>
          <p className="description">
            It's recommended to use a large or shareable screen, that all players can see, for the host device.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChooseRole;
