import React, { useEffect, useState } from "react";
import ConfirmModal from "../common/ConfirmModal";
import { deleteGameApi } from "../../api/gameApi";
import "../../styles/header.css";
import he from "he";
import { getColorScheme } from "../../utils/ColorUtils";
import { ColorMapping } from "../types/ColorMappingType";
import { useTheme } from "../../utils/ThemeContext";
import { GameData } from "../types/GameDataTypes";
import Timer from "./Timer";

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
    const [colors, setColors] = useState<ColorMapping>(
        getColorScheme("DEFAULT")
    );
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
