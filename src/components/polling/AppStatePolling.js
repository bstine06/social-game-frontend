import React, { useEffect } from 'react';
import { getGlobalState } from '../../api/appStateApi';

function AppStatePolling({ onUpdateState }) {
  
  useEffect(() => {
    console.log('Fetching global app state');
    const fetchGlobalState = async () => {
      try {
        const state = await getGlobalState();  // Await the API response
        console.log('Global state:', state);
        onUpdateState(state);  // Pass the result to the parent component or state
      } catch (error) {
        console.error('Error fetching global state:', error);
      }
    };
  
    fetchGlobalState();  // Fetch initially
  
    const intervalId = setInterval(() => {
      console.log('Polling for global state');
      fetchGlobalState();
    }, 5000);  // Fetch every 5 seconds
  
    return () => {
      console.log('Cleaning up interval');
      clearInterval(intervalId);  // Cleanup on unmount
    };
  }, []);  // Only re-run effect if onUpdateState changes
  

  return null;  // Since there's nothing to render
}

export default AppStatePolling;
