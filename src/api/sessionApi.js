const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const getSession = async () => {
  try {
    const response = await fetch(`${backendUrl}/get-session`, {
      method: 'GET',
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const setSession = async () => {
  try {
    const response = await fetch(`${backendUrl}/set-session`, {
      method: 'GET',
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.text();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const fetchSessions = async () => {
  try {
    const response = await fetch(`${backendUrl}/get-all-sessions`, {
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

export const setName = async (name) => {
  try {
    const response = await fetch(`${backendUrl}/set-name`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ name }),
    });
    console.log("Setting name");
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getName = async () => {
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