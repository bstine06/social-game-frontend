import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import TestComponent from './components/TestComponent';
import CreatePlayerComponent from './components/CreatePlayerComponent';
import ViewAllPlayersComponent from './components/ViewAllPlayersComponent';
import './styles.css';  // Import the CSS file

function App() {
  return (
    <div id="dashboard-container">
      <div className="item">
        <h1>Social Game Dashboard</h1>
      </div>
      <div className="item">
        <TestComponent />
      </div>
      <div className="item">
        <CreatePlayerComponent />
      </div>
      <div className="item">
        <ViewAllPlayersComponent />
      </div>
    </div>
  );
}

// Create a root and render the App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
