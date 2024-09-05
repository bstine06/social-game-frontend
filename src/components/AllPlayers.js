import React from 'react';

function AllPlayers({ players }) {
  return (
    <div>
      <h2>View All Players</h2>
      {/* Render players in a table */}
      <div>
        {players.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Player Name</th>
                <th>Player Id</th>
                <th>Session ID</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr key={index}>
                  <td>{player.playerName}</td>
                  <td>{player.playerId}</td>
                  <td>{player.sessionId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No players found</p>
        )}
      </div>
    </div>
  );
}

export default AllPlayers;
