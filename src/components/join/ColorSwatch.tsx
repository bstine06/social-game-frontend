import React from "react";

interface ColorSwatchProps {
    color: string;
    onClick?: () => void; // Optional onClick prop
    selected: boolean
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ color, onClick, selected }) => {

    return (
        <>
        
        <div className={`color-swatch ${selected ? "selected" : ""}`} style={{backgroundColor: color}} onClick={onClick}></div>
        </>
        
    )

}

export default ColorSwatch;