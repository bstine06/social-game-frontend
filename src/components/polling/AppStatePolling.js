import React, { useEffect } from 'react';
import { getGlobalAppState } from '../../api/appStateApi';

function AppStatePolling({ onUpdateAppState }) {
  
  useEffect(() => {
    console.log('Fetching global app state');
    const fetchGlobalAppState = async () => {
      try {
        const appState = await getGlobalAppState();  // Await the API response
        console.log('App State:', appState);
        onUpdateAppState(appState);  // Pass the result to the parent component or state
      } catch (error) {
        console.error('Error fetching app state:', error);
      }
    };
  
    fetchGlobalAppState();  // Fetch initially
  
    const intervalId = setInterval(() => {
      console.log('Polling for app state');
      fetchGlobalAppState();
    }, 5000);  // Fetch every 5 seconds
  
    return () => {
      console.log('Cleaning up interval');
      clearInterval(intervalId);  // Cleanup on unmount
    };
  }, []);  // Only re-run effect if onUpdateAppState changes
  

  return null;  // Since there's nothing to render
}

export default AppStatePolling;
