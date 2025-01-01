import React from "react";
import LilGuy1 from "../../resources/lil-guys/LilGuy1";
import LilGuy2 from "../../resources/lil-guys/LilGuy2";
import LilGuy3 from "../../resources/lil-guys/LilGuy3";
import LilGuy4 from "../../resources/lil-guys/LilGuy4";
import LilGuy5 from "../../resources/lil-guys/LilGuy5";
import LilGuy6 from "../../resources/lil-guys/LilGuy6";
import PlusCircleSVG from "../../resources/PlusCircleSVG";
import QuestionMarkSVG from "../../resources/QuestionMarkSVG";
import { getHex } from "../../utils/ColorUtils";

interface LilGuyProps {
    onSelect?: (selection: number) => void;
    lilGuyIndex: number;
    fillColor: string;
    isSelected: boolean;
}

const LilGuy: React.FC<LilGuyProps> = ({
    onSelect,
    lilGuyIndex,
    fillColor,
    isSelected,
}) => {
    const handleSelect = () => {
        if (onSelect) onSelect(lilGuyIndex);
    };

    const renderLilGuy = () => {
        switch (lilGuyIndex) {
            case 1:
                return <LilGuy1 fillColor={getHex(fillColor)}/>
            case 2:
                return <LilGuy2 fillColor={getHex(fillColor)} />
            case 3:
                return <LilGuy3 fillColor={getHex(fillColor)} />
            case 4:
                return <LilGuy4 fillColor={getHex(fillColor)} />
            case 5:
                return <LilGuy5 fillColor={getHex(fillColor)} />
            case 6:
                return <LilGuy6 fillColor={getHex(fillColor)} />
            case 99:
                return <QuestionMarkSVG />
            case 98:
                return <PlusCircleSVG />
        }
    }

    return (
        <div onClick={handleSelect} className=
            {
                `lil-guy ${isSelected ? 'selected' : ''}`
            }
        >
            {renderLilGuy()}
        </div>
    );
};

export default LilGuy;
