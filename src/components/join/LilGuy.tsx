import React from "react";
import { getHex } from "../../utils/ColorUtils";
import LilGuy1 from "../../resources/lil-guys/LilGuy1";
import LilGuy2 from "../../resources/lil-guys/LilGuy2";
import LilGuy3 from "../../resources/lil-guys/LilGuy3";

interface LilGuyProps {
    onSelect?: (selection: number) => void;
    lilGuyIndex: number;
    fillColor: string;
    isSelected: boolean;
}

const LilGuy: React.FC<LilGuyProps> = ({
    onSelect,
    fillColor,
    lilGuyIndex,
    isSelected,
}) => {
    const handleSelect = () => {
        if (onSelect) onSelect(lilGuyIndex);
    };

    const renderLilGuy = () => {
        switch (lilGuyIndex) {
            case 1:
                return <LilGuy1 fillColor={getHex(fillColor)} />
            case 2:
                return <LilGuy2 fillColor={getHex(fillColor)} />
            case 3:
                return <LilGuy3 fillColor={getHex(fillColor)} />
        }
    }

    return (
        <div onClick={handleSelect} className={`lil-guy ${isSelected ? 'selected' : ''}`}>
            {renderLilGuy()}
        </div>
    );
};

export default LilGuy;
