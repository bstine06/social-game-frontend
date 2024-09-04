import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import TestComponent from './components/TestComponent/TestComponent';
import CreatePlayerComponent from './components/CreatePlayerComponent/CreatePlayerComponent';

function App() {
  return (
    <div>
      <h1>Hello, World!</h1>
      <TestComponent />
      <CreatePlayerComponent />
    </div>
  );
}

// Create a root and render the App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
