const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const createPlayer = async (playerName) => {
  try {
    const response = await fetch(`${backendUrl}/add-player`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ playerName }),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const fetchPlayers = async () => {
  try {
    const response = await fetch(`${backendUrl}/get-all-players`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
