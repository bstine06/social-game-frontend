import React, { useEffect, useState } from "react";
import ConfirmModal from "../common/ConfirmModal";
import { deleteGameApi } from "../../api/gameApi";
import "../../styles/header.css";
import he from "he";
import { getColorScheme } from "../../utils/ColorUtils";
import { ColorMapping } from "../types/ColorMappingType";
import { useTheme } from "../../utils/ThemeContext";

interface HeaderProps {
    onCancel: () => void;
    gameId: string;
    role: string;
    confirmModalContent: string;
}

const Header: React.FC<HeaderProps> = ({
    onCancel,
    gameId,
    role,
    confirmModalContent
}) => {
    const [isBackModalOpen, setIsBackModalOpen] = useState<boolean>(false);
    const [colors, setColors] = useState<ColorMapping>(
        getColorScheme("DEFAULT")
    );
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const { themeColor } = useTheme();

    useEffect(() => {
        setColors(getColorScheme(themeColor));
    }, [themeColor]);

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
