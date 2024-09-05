import React, { useState, useEffect } from 'react';
import { getSession } from '../api/sessionApi';

function Session({ onSessionReady }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const sessionData = await getSession();
        console.log('Session Data:', sessionData);
        setMessage("Session found: " + sessionData);
        onSessionReady();  // Notify Dashboard that session is ready
      } catch (error) {
        console.error('Error fetching session data:', error);
        alert(`Error: ${error.message}`);
      }
    };

    fetchSession();
  }, [onSessionReady]);  // Ensure session fetch happens only once

  return (
    <div>
      <h2>Unique session information:</h2>
      <p>{message}</p>
    </div>
  );
}

export default Session;
