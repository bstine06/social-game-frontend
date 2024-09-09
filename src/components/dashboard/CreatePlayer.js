import React, { useState } from 'react';
import { createPlayer } from '../../api/sessionApi';

function CreatePlayer({ onPlayerCreated, userSession }) {
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
      <h2>{userSession?.player
          ? `Edit player name:`
          : `Create Player. Enter name:`}
      </h2>
      
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
