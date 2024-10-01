const backendUrl = process.env.REACT_APP_BACKEND_URL;
const requestMapping = "player";

export const getSessionRole = async () => {
  try {
    const response = await fetch(`${backendUrl}/session`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json(); // Parse the response as JSON
    return data.role; // Access the 'role' key to get its value
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export const getPlayer = async () => {
  try {
    // Make the fetch request
    const response = await fetch(`${backendUrl}/${requestMapping}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const createPlayer = async (gameId : string, name : string) => {
  try {
    const response = await fetch(`${backendUrl}/${requestMapping}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',  // Set the content type to JSON
      },
      body: json.stringify({ gameId, name })
    });
    
    if (!response.ok) throw new Error('Network response was not ok');
    
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
