import React, { useState } from "react";
import { updateGameStateApi } from "../../api/gameApi";
import ConfirmModal from "./ConfirmModal";
import { GameData } from "../types/GameDataTypes";

interface StartGameProps {
    playerCount: number;
    gameData: GameData;
}

const StartGame: React.FC<StartGameProps> = ({ playerCount, gameData }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const handleSubmit = async () => {
        if (playerCount >= 3) {
            setIsModalOpen(true);
        }
    };

    const handleConfirm = async () => {
        try {
            await updateGameStateApi(gameData.gameId);
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
            {isModalOpen && (
                <ConfirmModal
                    message={"Are you sure you want to start?"}
                    content={``}
                    confirmText={"Yes, let's get it poppin"}
                    cancelText={"Not yet"}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
            <div
                className={`container ${
                    playerCount >= 3 ? "clickable" : ""
                }`}
                onClick={handleSubmit}
            >
                {playerCount < 3 && (
                    <p className="description">
                        At least 3 players must join to begin the game
                    </p>
                )}
                {playerCount >= 3 && (
                    <p className="subheading one-line">
                        START {gameData.roundCount === 0 ? "GAME" : `ROUND ${gameData.roundCount + 1}`}
                    </p>
                )}
            </div>
        </>
    );
};

export default StartGame;