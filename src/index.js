import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import TestComponent from './components/TestComponent';
import PlayerDashboard from './components/PlayerDashboard';
import './styles.css';  // Import the CSS file

function App() {
  return (
    <PlayerDashboard />
  );
}

// Create a root and render the App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
