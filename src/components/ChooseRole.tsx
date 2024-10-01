import React from 'react';

// Define the type for the props
interface ChooseRoleProps {
  onChooseHost: () => void; // Function to handle hosting
  onChooseJoin: () => void; // Function to handle joining
}

const ChooseRole: React.FC<ChooseRoleProps> = ({ onChooseHost, onChooseJoin }) => {
  return (
    <div>
      <h2>How will you be using this device?</h2>
      <button onClick={onChooseHost}>Host</button>
      <button onClick={onChooseJoin}>Join</button>
    </div>
  );
}

export default ChooseRole;
