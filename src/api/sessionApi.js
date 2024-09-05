const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const getSession = async () => {
  try {
    const response = await fetch(`${backendUrl}/get-session`, {
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
