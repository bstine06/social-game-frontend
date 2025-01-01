import React, { useState } from "react";
import { Player, PlayerData } from "../types/playerDataTypes";
import PlayerDisplay from "./PlayerDisplay";
import ConfirmModal from "./ConfirmModal";
import { deletePlayerByIdApi } from "../../api/playerApi";
import { GameData } from "../types/GameDataTypes";

interface PlayersJoinedDisplayProps {
    playerData: PlayerData[];
    gameData: GameData;
    unremovablePlayerId?: string;
    hostPrivileges?: boolean;
}

type PlayerToDelete = {
    node: React.ReactNode;
    playerId: string;
}

const PlayersJoinedDisplay: React.FC<PlayersJoinedDisplayProps> = ({
    playerData,
    gameData,
    unremovablePlayerId,
    hostPrivileges = false
}) => {
    const [playerToDelete, setPlayerToDelete] = useState<PlayerToDelete>();

    const handleConfirm = async () => {
        try {
            if (!playerToDelete) throw new Error("playerToDelete was not set");
            await deletePlayerByIdApi(playerToDelete.playerId);
            setPlayerToDelete(undefined); // Close modal
        } catch (error) {
            console.error("Error starting game: ", error);
        }
    };

    const handleCancel = () => {
        // Close the modal without submitting
        setPlayerToDelete(undefined);
    };

    const handleDelete = (player: Player) => {
        const newPlayerToDelete : PlayerToDelete = {
            node: <PlayerDisplay player={player} />,
            playerId: player.playerId
        }
        setPlayerToDelete(newPlayerToDelete);
    }

    const playerDisplays = playerData.sort((a, b) => b.player.score - a.player.score).map((data) => (
        <div style={{ display: "flex", flexDirection: "row" }} key={data.player.playerId}>
            <PlayerDisplay player={data.player} />
            {gameData.roundCount > 0 && (
                <p className="score-display">{data.player.score}</p>
            )}
            {hostPrivileges &&  playerData.length > 1 && (
                <button
                    onClick={() => handleDelete(data.player)}
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
            
            <div className="players-list-container">{playerDisplays}</div>
            {hostPrivileges && playerToDelete && <ConfirmModal 
                message="Do you want to throw this player in the trash?"
                content="This action cannot be undone!"
                element={playerToDelete.node}
                confirmText="Yes"
                cancelText="No"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />}
            <p className="character-count">{`players joined: ${playerData.length}/8`}</p>
        </>
    );
};

export default PlayersJoinedDisplay;
