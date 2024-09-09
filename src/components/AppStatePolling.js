import React, { useEffect } from 'react';
import { getGlobalAppState } from '../api/appStateApi';  // Assuming this is an async function

function AppStatePolling({ onUpdateAppState }) {
  
  useEffect(() => {
    const fetchGlobalAppState = async () => {
      try {
        const appState = await getGlobalAppState();  // Await the API response
        onUpdateAppState(appState);  // Pass the result to the parent component or state
      } catch (error) {
        console.error('Error fetching app state:', error);
      }
    };

    fetchGlobalAppState();  // Fetch initially

    const intervalId = setInterval(fetchGlobalAppState, 5000);  // Pass the function reference

    return () => clearInterval(intervalId);  // Cleanup on unmount
  }, [onUpdateAppState]);  // Add onUpdateAppState as a dependency

  return null;  // Since there's nothing to render
}

export default AppStatePolling;
