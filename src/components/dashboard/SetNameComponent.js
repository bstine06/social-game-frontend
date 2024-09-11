import React, { useState } from 'react';
import { setName } from '../../api/sessionApi';

function SetNameComponent({ onNameSet, userSession }) {
  const [nameInput, setNameInput] = useState('');

  const handleInputChange = (event) => {
    setNameInput(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      await setName(nameInput);
      onNameSet(); // Notify parent to update player list
      setNameInput(''); // Clear input field
    } catch (error) {
      console.error('Error creating player:', error);
    }
  };

  return (
    <div>
      <h2>{userSession?.name
          ? `Edit name:`
          : `Enter name:`}
      </h2>
      
      <input
        type="text"
        value={nameInput}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default SetNameComponent;
