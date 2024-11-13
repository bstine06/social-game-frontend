import React, { useState } from "react";
import '../../styles/player-display.css';
import LilGuy from "./LilGuy";
import ColorSelector from "./ColorSelector";
import { useTheme } from "../../utils/ThemeContext";

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
            <h2>Choose {lilGuySelection===0 ? "lil guy" : "color"}</h2>
            <div className={`${lilGuySelection===0 ? "selection-container" : "lil-guy-display-container"}`}>
            
            {lilGuySelection > 0 && <button className="big-button width-4em-centered full-height" onClick={() => updateSelection(0)}>back</button>}
                {(lilGuySelection===0 || lilGuySelection===1) && <LilGuy onSelect={updateSelection} lilGuyIndex={1} isSelected={lilGuySelection===1} fillColor={themeColor}/>}
                {(lilGuySelection===0 || lilGuySelection===2) && <LilGuy onSelect={updateSelection} lilGuyIndex={2} isSelected={lilGuySelection===2} fillColor={themeColor}/>}
                {(lilGuySelection===0 || lilGuySelection===3) && <LilGuy onSelect={updateSelection} lilGuyIndex={3} isSelected={lilGuySelection===3} fillColor={themeColor}/>}
            </div>
            {lilGuySelection > 0 && <ColorSelector onChooseColor={handleChooseColor} selectedColor={themeColor}/>}
            {lilGuySelection > 0 && <button onClick={() => onSubmit(lilGuySelection, themeColor)} className="big-button">submit</button>}
        </>
    )

}

export default LilGuySelect;
