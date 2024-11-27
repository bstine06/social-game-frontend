import React, { useState } from "react";
import { Player, PlayerData } from "../types/playerDataTypes";
import PlayerDisplay from "./PlayerDisplay";
import ConfirmModal from "./ConfirmModal";
import { deletePlayerByIdApi } from "../../api/playerApi";

interface PlayersJoinedDisplayProps {
    playerData: PlayerData[];
    hostPrivileges?: boolean;
}

const PlayersJoinedDisplay: React.FC<PlayersJoinedDisplayProps> = ({
    playerData,
    hostPrivileges = false
}) => {
    const [selectedPlayer, setSelectedPlayer] = useState<Player>();

    const handleConfirm = async (playerId: string) => {
        try {
            await deletePlayerByIdApi(playerId);
            setSelectedPlayer(undefined); // Close modal
        } catch (error) {
            console.error("Error starting game: ", error);
        }
    };

    const handleCancel = () => {
        // Close the modal without submitting
        setSelectedPlayer(undefined);
    };

    const playerDisplays = playerData.map((data) => (
        <div style={{ display: "flex", flexDirection: "row" }}
            key={data.player.playerId} // Add unique key
            
        >
            <PlayerDisplay player={data.player} />
            {hostPrivileges && <button 
                onClick={hostPrivileges ? () => setSelectedPlayer(data.player) : () => null}
                className={"remove-player-btn"}>x
            </button>}
        </div>
    ));    

    return (
        <>
            <p className="description">{`Players joined: ${playerData.length}/8`}</p>
            <div className="players-list-container">{playerDisplays}</div>
            {hostPrivileges && selectedPlayer && <ConfirmModal 
                message="Do you want to remove this player from the game?"
                content={selectedPlayer.name}
                confirmText="Yes"
                cancelText="No"
                onConfirm={() => handleConfirm(selectedPlayer.playerId)}
                onCancel={handleCancel}
            />}
        </>
    );
};

export default PlayersJoinedDisplay;
