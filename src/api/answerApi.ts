const backendUrl = process.env.REACT_APP_BACKEND_URL;
const requestMapping = "answer";

export const submitAnswerApi = async (gameId: string, questionId: string, answer: string) => {
    try {
      const response = await fetch(`${backendUrl}/${requestMapping}/submit-answer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({gameId, questionId, answer})
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }