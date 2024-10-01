import React, { useEffect } from 'react';
import { getSession } from '../../api/sessionApi';

interface Session {
  role: string;
  id: string;
  // Add other fields as necessary
}

interface SessionPollingProps {
  onUpdateSession: (session: Session | null) => void;
}

function SessionPolling({ onUpdateSession }: SessionPollingProps): JSX.Element | null {
  useEffect(() => {
    const fetchSession = async () => {
      console.log("Fetching session...");
      try {
        const session: Session = await getSession();
        onUpdateSession(session.role, session.id);
      } catch (error) {
        console.error('Error fetching session:', error);
        onUpdateSession(null);
      }
    };

    fetchSession();  // Fetch the session only once when the component mounts

  }, []); // Empty dependency array ensures it runs only on mount

  return null;  // Since there's nothing to render
}

export default SessionPolling;

