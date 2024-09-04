import React, { useState } from 'react';

function CreatePlayerComponent() {

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  // State to hold the input value
  const [name, setName] = useState('');

  // Function to handle input change
  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    console.log('Submitting:', { playerName: name });
    try {
      const response = await fetch(`${backendUrl}/add-player`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies
        body: JSON.stringify({ playerName: name }),
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log('Player created:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div>
      <h2>Create Player. Enter name:</h2>
      <input
        type="text"
        value={name}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default CreatePlayerComponent;
