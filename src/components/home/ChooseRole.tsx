import React from 'react';
const gameName = process.env.REACT_APP_GAME_NAME;

// Define the type for the props
interface ChooseRoleProps {
  onChooseHost: () => void; // Function to handle hosting
  onChooseJoin: () => void; // Function to handle joining
}

const ChooseRole: React.FC<ChooseRoleProps> = ({ onChooseHost, onChooseJoin }) => {
  return (
    <div className="container">
      <h2>{`Welcome to ${gameName}!`}</h2>
      <button className="big-button" onClick={onChooseHost}>Host</button>
      <button className="big-button" onClick={onChooseJoin}>Join</button>
    </div>
  );
}

export default ChooseRole;
