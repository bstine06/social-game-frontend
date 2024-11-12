import React, { useState } from 'react';
import '../../styles/choose-role.css';
const gameName = process.env.REACT_APP_GAME_NAME;

// Define the type for the props
interface ChooseRoleProps {
  onChooseHost: () => void; // Function to handle hosting
  onChooseJoin: () => void; // Function to handle joining
  isConnected: boolean;
}

const ChooseRole: React.FC<ChooseRoleProps> = ({ onChooseHost, onChooseJoin, isConnected }) => {

  return (
    <div className="container">
      <p className="subheading">LET'S PLAY!</p>
      <p className="description">choose an option:</p>
      <div className="options-container">
        <div className={`option btn ${isConnected ? '' : 'greyed-out'}`} onClick={isConnected ? onChooseJoin : undefined}>
          <p className="option-name">JOIN</p>
          <p className="description">
            join a game created by a host device
          </p>
        </div>
        <div className={`option btn ${isConnected ? '' : 'greyed-out'}`} onClick={isConnected ? onChooseHost : undefined}>
          <p className="option-name">HOST</p>
          <p className="description">
            host a game for other players to join
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChooseRole;
