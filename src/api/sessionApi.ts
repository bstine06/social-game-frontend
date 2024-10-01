const backendUrl = process.env.REACT_APP_BACKEND_URL;
const requestMapping = "session";

export const getSessionRole = async () => {
  try {
    const response = await fetch(`${backendUrl}/${requestMapping}`, {
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
