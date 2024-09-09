const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const getGlobalAppState = async () => {
  try {
    const response = await fetch(`${backendUrl}/appstate/get-appstate`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json(); // Parse the JSON response
    return data.appState; // Return only the "appState" value
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const updateGlobalAppState = async (appState) => {
  try {
    const response = await fetch(`${backendUrl}/appstate/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ appState }),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
