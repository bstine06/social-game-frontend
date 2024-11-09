import React, { useEffect, useState } from "react";
import ConfirmModal from "../common/ConfirmModal";
import { deleteGameApi } from "../../api/gameApi";
import "../../styles/header.css";
import he from "he";
import { getColorScheme } from "../../utils/ColorUtils";
import { ColorMapping } from "../types/ColorMappingType";

interface HeaderProps {
    onCancel: () => void;
    gameId: string;
    role: string;
    playerName?: string;
    confirmModalContent: string;
    color: string;
}

const Header: React.FC<HeaderProps> = ({
    onCancel,
    gameId,
    role,
    playerName,
    confirmModalContent,
    color,
}) => {
    const [isBackModalOpen, setIsBackModalOpen] = useState<boolean>(false);
    const [colors, setColors] = useState<ColorMapping>(
        getColorScheme("DEFAULT")
    );
    const [isHovered, setIsHovered] = useState<boolean>(false);

    useEffect(() => {
        setColors(getColorScheme(color));
    }, [color]);

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

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    return (
        <>
            <div className="header-wrapper">
                {playerName && (
                    <div
                        className={`name-reveal-div ${
                            isHovered ? "visible" : ""
                        }`}
                    >
                        <div className="player-name-wrapper">
                            <p>your name:</p>
                            <p>{he.decode(playerName)}</p>
                        </div>
                    </div>
                )}
                <div
                    className="header"
                    style={{ backgroundColor: colors.bg, color: colors.text }}
                >
                    <button
                        onClick={handleBackSubmit}
                        style={{
                            backgroundColor: colors.bg,
                            color: colors.text,
                        }}
                    >
                        EXIT
                    </button>
                    <div className="text-shrinker">
                        {role === "PLAYER" && (
                            <p
                                className="header-main-text"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                PLAYER
                            </p>
                        )}
                        {role === "HOST" && (
                            <p className="header-main-text">HOST</p>
                        )}
                        {role === "PLAYER_CREATION" && <p className="header-main-text">JOIN GAME</p>}
                    </div>
                    <p>{gameId}</p>
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
