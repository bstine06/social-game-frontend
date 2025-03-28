const backendUrl = process.env.REACT_APP_BACKEND_URL;
const requestMapping = "question-help";

export const getQuestionHelpApi = async () => {
    try {
      const response = await fetch(`${backendUrl}/${requestMapping}`, {
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
  }