import React, { useState, useEffect } from 'react';
import { getSession, setSession } from '../api/sessionApi';

function TestComponent() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const sessionData = await getSession();
        console.log('Session Data:', sessionData);
        if (sessionData.includes("No session ID found")) {
          const newSession = await setSession();
          setMessage("New session created: " + newSession);
        } else {
          setMessage("Session found: " + sessionData);
        }
      } catch (error) {
        console.error('Error fetching session data:', error);
        alert(`Error: ${error.message}`);
      }
    };

    fetchSession();
  }, []);

  return (
    <div>
      <h2>Unique session information:</h2>
      <p>{message}</p>
    </div>
  );
}

export default TestComponent;
