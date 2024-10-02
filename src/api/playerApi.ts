const backendUrl = process.env.REACT_APP_BACKEND_URL;
const requestMapping = "player";

export const getPlayerById = async () => {
  try {
    // Make the fetch request
    const response = await fetch(`${backendUrl}/${requestMapping}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const createPlayerApi = async (gameId: string, name: string) => {
  try {
    const response = await fetch(`${backendUrl}/${requestMapping}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: JSON.stringify({ gameId, name }),
    });

    if (!response.ok) throw new Error("Network response was not ok");

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getAllPlayerNamesInGame = async (gameId : string) => {
    try {
      // Make the fetch request
      const response = await fetch(`${backendUrl}/${requestMapping}/${gameId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const players = await response.json();
      const playerNames = players.map((player : any) => player.name);
      return playerNames
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
