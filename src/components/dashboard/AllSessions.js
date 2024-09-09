import React from 'react';

function AllSessions({ sessions }) {
  return (
    <div>
      <h2>View All Sessions</h2>
      {/* Render players in a table */}
      <div>
        {sessions.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Session ID</th>
                <th>Player Name</th>
                <th>Host Player</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session, index) => (
                <tr key={index}>
                  <td>{session.sessionId}</td>
                  <td>{session.player ? session.player.playerName : 'No player assigned'}</td>
                  <td>{session.player ? (session.player.hostPlayer ? 'Yes' : 'No') : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No sessions found</p>
        )}
      </div>
    </div>
  );
}

export default AllSessions;

