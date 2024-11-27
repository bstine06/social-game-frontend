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

export const createPlayerApi = async (gameId: string, name: string, shape: number, color: string) => {
  try {
    const response = await fetch(`${backendUrl}/${requestMapping}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: JSON.stringify({ gameId, name, shape, color }),
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
      return playerNames;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  export const getPlayersInGameApi = async (gameId : string) => {
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
      return players;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  export const deletePlayerApi = async () => {
    try {
        const response = await fetch(`${backendUrl}/${requestMapping}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) throw new Error("Network response was not ok");
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
  }

  export const deletePlayerByIdApi = async (playerId: string) => {
    try {
        const response = await fetch(`${backendUrl}/${requestMapping}/id/${playerId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) throw new Error("Network response was not ok");
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
  }
