import React, { useState } from 'react';
import { createPlayer } from '../api/playerApi';

function CreatePlayer({ onPlayerCreated }) {
  const [name, setName] = useState('');

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      await createPlayer(name);
      onPlayerCreated(); // Notify parent to update player list
      setName(''); // Clear input field
    } catch (error) {
      console.error('Error creating player:', error);
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

export default CreatePlayer;
