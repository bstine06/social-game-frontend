import React from 'react';
import WatchPlayers from './WatchPlayers';

// Define the type for the props
interface HostProps {
  gameId: string;
}

const ChooseRole: React.FC<HostProps> = ({ gameId }) => {
  return (
    <div>
      <h2>Host Game</h2>
      <p>{gameId}</p>
      <WatchPlayers gameId={gameId} />
    </div>
  );
}

export default ChooseRole;