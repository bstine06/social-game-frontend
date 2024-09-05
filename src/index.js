import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import Dashboard from './components/Dashboard';
import './styles.css';  // Import the CSS file

function App() {
  return (
    <Dashboard />
  );
}

// Create a root and render the App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
