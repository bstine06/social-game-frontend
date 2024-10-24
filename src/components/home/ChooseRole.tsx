import React, { useState } from 'react';
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
      <h3>LET'S PLAY!</h3>
      <p className="description">choose an option:</p>
      <div className="options-container">
        <div className="option btn" onClick={onChooseJoin}>
          <p className="option-name">JOIN</p>
          <p className="description">
            Join a game created by a host device.
          </p>
        </div>
        <div className="option btn" onClick={onChooseHost}>
          <p className="option-name">HOST</p>
          <p className="description">
            Host a game for players to join.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChooseRole;
