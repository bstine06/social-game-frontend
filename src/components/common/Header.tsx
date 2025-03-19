import React, { useState } from "react";
import ConfirmModal from "../common/ConfirmModal";
import "../../styles/header.css";
import { GameData } from "../types/GameDataTypes";
import MusicPlayer from "../host/MusicPlayer";

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
                    {<div className="text-shrinker">
                        <h2 className="fun">
                        POP SQUIZZY
                        </h2>
                    </div>}
                    <div className="flex">
                        <p style={{margin: 0}}>{gameData.gameId}</p>
                        {role==="HOST" && <MusicPlayer />}
                    </div>
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
