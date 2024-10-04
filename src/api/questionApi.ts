const backendUrl = process.env.REACT_APP_BACKEND_URL;
const requestMapping = "question";

export const submitQuestionApi = async (gameId: string, question: string) => {
  try {
    const response = await fetch(`${backendUrl}/${requestMapping}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({gameId, question})
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export const getQuestionsForPlayerApi = async () => {
  try {
    const response = await fetch(`${backendUrl}/${requestMapping}/get-questions-for-player`, {
      method: 'GET',
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