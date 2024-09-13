const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const getGlobalState = async () => {
  try {
    const response = await fetch(`${backendUrl}/state/get-state`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json(); // Parse the JSON response
    return data; // Return only the "appState" value
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const updateGlobalState = async (state) => {
  try {
    const response = await fetch(`${backendUrl}/state/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
