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
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session, index) => (
                <tr key={index}>
                  <td>{session.sessionId}</td>
                  <td>{session.name ? session.name : 'No name assigned'}</td>
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

