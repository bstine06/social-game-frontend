import React, { useState } from "react";
import '../../styles/lil-guy.css';
import LilGuy1 from "../../resources/lil-guys/LilGuy1";
import LilGuy from "./LilGuy";
import ColorSelector from "./ColorSelector";

interface LilGuySelectProps {
    playerName?: string
    onColorSelect: (color: string) => void;
    onSubmit: (shape: number, color: string)=>void;
}


const LilGuySelect: React.FC<LilGuySelectProps> = ({
    playerName,
    onColorSelect,
    onSubmit
}) => {
    const [lilGuySelection, setLilGuySelection] = useState<number>(0);
    const [colorSelection, setColorSelection] = useState<string>("#a65bdc");

    const updateSelection = (selection : number) => {
        setLilGuySelection(selection);
        if (selection === 0) setColorSelection("#a65bdc");
    }

    const handleChooseColor = (color: string) => {
        setColorSelection(color);
        onColorSelect(color);
    }

    return (
        <>
            <h3>Choose {lilGuySelection===0 ? "lil guy" : "color"}</h3>
            <div className={`lil-guy-${lilGuySelection===0 ? "selection" : "display" }-container`}>
            
            {lilGuySelection > 0 && <button className="big-button width-4em-centered full-height" onClick={() => updateSelection(0)}>back</button>}
                {(lilGuySelection===0 || lilGuySelection===1) && <LilGuy onSelect={updateSelection} lilGuyIndex={1} isSelected={lilGuySelection===1} fillColor={colorSelection}/>}
                {(lilGuySelection===0 || lilGuySelection===2) && <LilGuy onSelect={updateSelection} lilGuyIndex={2} isSelected={lilGuySelection===2} fillColor={colorSelection}/>}
                {(lilGuySelection===0 || lilGuySelection===3) && <LilGuy onSelect={updateSelection} lilGuyIndex={3} isSelected={lilGuySelection===3} fillColor={colorSelection}/>}
            </div>
            {lilGuySelection > 0 && <ColorSelector onChooseColor={handleChooseColor} selectedColor={colorSelection}/>}
            {lilGuySelection > 0 && <button onClick={() => onSubmit(lilGuySelection, colorSelection)} className="big-button">submit</button>}
        </>
    )

}

export default LilGuySelect;
