import React from "react";
import ColorSwatch from "./ColorSwatch";
import LilGuy from "./LilGuy";
import { getColorOptions } from "../../utils/ColorUtils";
import { ColorOption } from "../types/ColorMappingType";
import "../../styles/color-selector.css";

interface ColorSelectorProps {
    onChooseColor: (color: string) => void;
    selectedColor: string;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ onChooseColor, selectedColor }) => {
    const colorOptions = getColorOptions();

    return (
        <>
            <div className="color-selector-container">
                {colorOptions.map((colorOption, index) => (
                    <ColorSwatch
                        key={index}
                        selected={selectedColor===colorOption.name}
                        onClick={() => onChooseColor(colorOption.name)}
                        color={colorOption.hex}
                    />
                ))}
            </div>
        </>
    );
};

export default ColorSelector;
