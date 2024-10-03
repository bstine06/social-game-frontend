const backendUrl = process.env.REACT_APP_BACKEND_URL;
const requestMapping = "game";

export const createGame = async () => {
  try {
    const response = await fetch(`${backendUrl}/${requestMapping}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export const deleteGameApi = async (gameId : string) => {
  try {
    const response = await fetch(`${backendUrl}/${requestMapping}/${gameId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export const getGameByHostId = async () => {
  try {
    const response = await fetch(`${backendUrl}/${requestMapping}/get-by-host-id`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',  // Set the content type to JSON
      }
    });
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

export const getGameStateByGameId = async (gameId) => {
  try {
    const response = await fetch(`${backendUrl}/${requestMapping}/${gameId}/state`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (response.status === 404) throw new Error('Game not found');
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json(); // Parse the JSON response
    return data.gameState; // Return only the "gameState" value
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const updateGameState = async (gameId) => {
  try {
    const response = await fetch(`${backendUrl}/${requestMapping}/${gameId}/state`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export const getGameById = async (gameId) => {
  try {
    const response = await fetch(`${backendUrl}/${requestMapping}/${gameId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

