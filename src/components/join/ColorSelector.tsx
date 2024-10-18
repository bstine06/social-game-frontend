import React from "react";
import ColorSwatch from "./ColorSwatch";
import LilGuy from "./LilGuy";
import "../../styles/color-selector.css";

interface ColorSelectorProps {
    onChooseColor: (color: string) => void;
    selectedColor: string;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ onChooseColor, selectedColor }) => {
    const colorOptions = [
        "#FF0000", // Red
        "#FFFF00", // Yellow
        "#00FF00", // Green
        "#00FFFF", // Cyan
        "#FF00FF", // Magenta
        "#FFA500", // Orange
        "#008000", // Dark Green
        "#0000FF", // Blue
        "#a65bdc", // Purple
    ];

    return (
        <>
            <div className="color-selector-container">
                {colorOptions.map((color, index) => (
                    <ColorSwatch
                        key={index}
                        selected={selectedColor===color}
                        onClick={() => onChooseColor(color)}
                        color={color}
                    />
                ))}
            </div>
        </>
    );
};

export default ColorSelector;
