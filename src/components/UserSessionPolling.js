import React, { useEffect } from 'react';
import { getSession } from '../api/sessionApi';  // Assuming this is an async function

function UserSessionPolling({ onUpdateUserSession }) {
  
  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const userSession = await getSession();  // Await the API response
        onUpdateUserSession(userSession);  // Pass the result to the parent component or state
      } catch (error) {
        console.error('Error fetching user session:', error);
      }
    };

    fetchUserSession();  // Fetch initially

    const intervalId = setInterval(fetchUserSession, 5000);  // Pass the function reference

    return () => clearInterval(intervalId);  // Cleanup on unmount
  }, []);  // Add onUpdateUserSession as a dependency

  return null;  // Since there's nothing to render
}

export default UserSessionPolling;