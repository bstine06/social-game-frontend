import React, { useState } from "react";
import { Player, PlayerData } from "../types/playerDataTypes";
import PlayerDisplay from "./PlayerDisplay";
import ConfirmModal from "./ConfirmModal";
import { deletePlayerByIdApi } from "../../api/playerApi";

interface PlayersJoinedDisplayProps {
    playerData: PlayerData[];
    unremovablePlayerId?: string;
    hostPrivileges?: boolean;
}

const PlayersJoinedDisplay: React.FC<PlayersJoinedDisplayProps> = ({
    playerData,
    unremovablePlayerId,
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
        <div style={{ display: "flex", flexDirection: "row" }} key={data.player.playerId}>
            <PlayerDisplay player={data.player} />
            {hostPrivileges &&  playerData.length > 1 && (
                <button
                    onClick={() => setSelectedPlayer(data.player)}
                    className="remove-player-btn"
                    disabled={
                        unremovablePlayerId === data.player.playerId
                    }
                >
                </button>
            )}
        </div>
    ));    

    return (
        <>
            <p className="description">{`Players joined: ${playerData.length}/8`}</p>
            <div className="players-list-container">{playerDisplays}</div>
            {hostPrivileges && selectedPlayer && <ConfirmModal 
                message="Do you want to throw this player in the trash?"
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
