const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const initialize = async () => {
  try {
    const response = await fetch(`${backendUrl}/game/initialize`, {
      method: 'POST',
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

export const submitQuestion = async (question) => {
  try {
    const response = await fetch(`${backendUrl}/game/submit-question`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ question }),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
