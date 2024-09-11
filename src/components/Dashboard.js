import React, { useState, useEffect } from "react";
import SetNameComponent from "./dashboard/SetNameComponent";
import AllSessions from "./dashboard/AllSessions";
import { fetchSessions } from "../api/sessionApi";

function Dashboard({ onStartGame, userSession }) {
  const [sessions, setSessions] = useState([]);

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

  const handleNameSet = () => {
    fetchAllSessions(); // Re-fetch the list of players
  };

  const startGame = () => {
    onStartGame();
  };

  return (
    <div id="dashboard-container">
      <div className="item">
        <h1>Social Game Dashboard</h1>
        <button onClick={startGame}>Start game</button>
      </div>

      <div className="item">
        <SetNameComponent onNameSet={handleNameSet} userSession={userSession}/>{" "}
        {/* Pass callback */}
      </div>
      <div className="item">
        <AllSessions sessions={sessions} />
      </div>
    </div>
  );
}

export default Dashboard;
