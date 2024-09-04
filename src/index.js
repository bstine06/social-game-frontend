import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import TestComponent from './components/TestComponent';
import CreatePlayerComponent from './components/CreatePlayerComponent';
import ViewAllPlayersComponent from './components/ViewAllPlayersComponent';

function App() {
  return (
    <div>
      <h1>Social Game Dashboard</h1>
      <TestComponent />
      <CreatePlayerComponent />
      <ViewAllPlayersComponent />
    </div>
  );
}

// Create a root and render the App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
