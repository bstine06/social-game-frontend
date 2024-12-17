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
        if (playerCount >= 3) {
            setIsModalOpen(true);
        }
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
            {isModalOpen && <ConfirmModal 
                message={"Are you sure you want to start?"}
                content={`There's ${playerCount} players`}
                confirmText={"Yes, let's get it poppin"}
                cancelText={"Not yet"}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />}
            <div 
                className={`container thinner-container expand-to-fit ${(playerCount >= 3) ? "clickable" : ""}`}
                onClick={handleSubmit}
            >
                {(playerCount < 3) && <p className="description">At least 3 players must join to begin the game</p>}
                {(playerCount >=3) && <p className="subheading">START GAME</p>}
                
            </div>
            
        </>
    );
};

export default StartGame;