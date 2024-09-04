import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import TestComponent from './components/TestComponent/TestComponent';

function App() {
  return (
    <div>
      <h1>Hello, World!</h1>
      <TestComponent />
    </div>
  );
}

// Create a root and render the App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
