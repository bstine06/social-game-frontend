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

export const getPlayer = async () => {
  try {
    const response = await fetch(`${backendUrl}/get-player`, {
      method: 'GET',
      credentials: 'include'
    });

    if (response.status === 404) {
      return "No player found"; // Expected behavior, no player data found
    } else if (!response.ok) {
      console.error('Failed to fetch player:', response.statusText);
      return "No player found"; // Return null or a custom value if the response is not OK
    }

    return await response.text(); // Return player data as text
  } catch (error) {
    console.error('Error fetching player:', error);
    return "No player found"; // Return null or a fallback value in case of network errors
  }
};
