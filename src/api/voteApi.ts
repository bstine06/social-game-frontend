const backendUrl = process.env.REACT_APP_BACKEND_URL;
const requestMapping = "vote";

export const getCurrentBallotApi = async (gameId: string) => {
  try {
    const response = await fetch(
      `${backendUrl}/${requestMapping}/${gameId}/get-current-ballot`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getCurrentBallotVotesApi = async (gameId: string) => {
  try {
    const response = await fetch(
      `${backendUrl}/${requestMapping}/${gameId}/get-current-ballot-votes`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const submitVoteApi = async (answerId: string) => {
  try {
    const response = await fetch(
      `${backendUrl}/${requestMapping}/submit-vote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({answerId})
      }
    );
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
