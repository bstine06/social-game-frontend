import React, { useState } from "react";
import ConfirmModal from "../common/ConfirmModal";
import "../../styles/header.css";
import { GameData } from "../types/GameDataTypes";

interface HeaderProps {
    onCancel: () => void;
    gameData: GameData;
    role: string;
    confirmModalContent: string;
}

const Header: React.FC<HeaderProps> = ({
    onCancel,
    gameData,
    role,
    confirmModalContent
}) => {
    const [isBackModalOpen, setIsBackModalOpen] = useState<boolean>(false);

    const handleBackSubmit = async () => {
        setIsBackModalOpen(true);
    };

    const handleBackConfirm = async () => {
        onCancel(); //Notify parent that the game is cancelled
    };

    const handleBackCancel = () => {
        // Close the modal without submitting
        setIsBackModalOpen(false);
    };

    return (
        <>
            <div className="header-wrapper">
                <div
                    className="header"
                >
                    <button
                        onClick={handleBackSubmit}
                    >
                        EXIT
                    </button>
                    <div className="text-shrinker">
                        {role}
                    </div>
                    <p>{gameData.gameId}</p>
                </div>
            </div>

            {isBackModalOpen && (
                <ConfirmModal
                    message="Are you sure want to exit?"
                    content={confirmModalContent}
                    confirmText="Yes, please exit"
                    cancelText="No, don't exit"
                    onConfirm={handleBackConfirm}
                    onCancel={handleBackCancel}
                />
            )}
        </>
    );
};

export default Header;
