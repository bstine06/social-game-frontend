import React, { useState } from "react";
import { updateGameStateApi } from "../../api/gameApi";
import ConfirmModal from "./ConfirmModal";

interface StartGameProps {
    playerCount: number;
    gameId: string;
}

const StartGame: React.FC<StartGameProps> = ({ playerCount, gameId }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleSubmit = async () => {
        setIsModalOpen(true);
    };

    const handleConfirm = async () => {
        try {
            await updateGameStateApi(gameId);
            setIsModalOpen(false); // Close modal
        } catch (error) {
            console.error("Error starting game: ", error);
        }
    };

    const handleCancel = () => {
        // Close the modal without submitting
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="container">
                <p>You've been granted the power to start the game!</p>
                <p className="description">At least 3 players are required</p>
                <p>{`Player count: ${playerCount}/8`}</p>
                <button disabled={playerCount < 3} className="big-button" onClick={handleSubmit}>
                    Start Game
                </button>
            </div>
            {isModalOpen && <ConfirmModal 
                message={"Are you sure you want to start?"}
                content={`There's ${playerCount} players`}
                confirmText={"Yes, let's get it poppin"}
                cancelText={"Not yet"}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />}
        </>
    );
};

export default StartGame;