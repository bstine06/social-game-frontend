import React, { useState, useEffect } from "react";
import CreatePlayer from "./dashboard/CreatePlayer";
import AllSessions from "./dashboard/AllSessions";
import { fetchSessions } from "../api/sessionApi";

function Dashboard({ onStartGame, userSession }) {
  const [sessions, setSessions] = useState([]);
  const hostPlayerFlag = userSession?.player?.hostPlayer;

  const fetchAllSessions = async () => {
    try {
      const result = await fetchSessions();
      setSessions(result);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  useEffect(() => {
    fetchAllSessions(); // Fetch all sessions
  }, []);

  const handlePlayerCreated = () => {
    fetchAllSessions(); // Re-fetch the list of players
  };

  const startGame = () => {
    onStartGame();
  };

  return (
    <div id="dashboard-container">
      <div className="item">
        <h1>Social Game Dashboard</h1>
        <button disabled={!hostPlayerFlag} onClick={startGame}>Start game</button>
      </div>

      <div className="item">
        <CreatePlayer onPlayerCreated={handlePlayerCreated} userSession={userSession}/>{" "}
        {/* Pass callback */}
      </div>
      <div className="item">
        <AllSessions sessions={sessions} />
      </div>
    </div>
  );
}

export default Dashboard;
