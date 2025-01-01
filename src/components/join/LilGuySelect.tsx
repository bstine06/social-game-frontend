import React, { useState } from "react";
import '../../styles/player-display.css';
import LilGuy from "./LilGuy";
import ColorSelector from "./ColorSelector";
import { useTheme } from "../../contexts/ThemeContext";

interface LilGuySelectProps {
    playerName?: string
    onSubmit: (shape: number, color: string)=>void;
}


const LilGuySelect: React.FC<LilGuySelectProps> = ({
    playerName,
    onSubmit
}) => {
    const [lilGuySelection, setLilGuySelection] = useState<number>(0);
    const { themeColor, setThemeColor } = useTheme();

    const updateSelection = (selection : number) => {
        setLilGuySelection(selection);
    }

    const handleChooseColor = (color: string) => {
        setThemeColor(color);
    }

    return (
        <>
            <p className="subheading">select {lilGuySelection===0 ? "avatar" : "color"}</p>
            <div className={`${lilGuySelection===0 ? "selection-container" : "lil-guy-display-container"}`}>
            
            {lilGuySelection > 0 && <button className="big-button width-4em-centered full-height" onClick={() => updateSelection(0)}>back</button>}
            {[1, 2, 3, 4, 5, 6].map((index) =>
                lilGuySelection === 0 || lilGuySelection === index ? (
                    <LilGuy
                        key={index} // Use a unique key for each item
                        onSelect={updateSelection}
                        lilGuyIndex={index}
                        isSelected={lilGuySelection === index}
                        fillColor={themeColor}
                    />
                ) : null
            )}
            </div>
            {lilGuySelection > 0 && <ColorSelector onChooseColor={handleChooseColor} selectedColor={themeColor}/>}
            {lilGuySelection > 0 && <button onClick={() => onSubmit(lilGuySelection, themeColor)} className="big-button">submit</button>}
        </>
    )

}

export default LilGuySelect;
