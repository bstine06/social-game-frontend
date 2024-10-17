import React, { useState } from "react";
import '../../styles/lil-guy.css';
import LilGuy1 from "../../resources/lil-guys/LilGuy1";
import LilGuy from "./LilGuy";

interface LilGuySelectProps {
    playerName?: string
}


const LilGuySelect: React.FC<LilGuySelectProps> = ({
    playerName
}) => {
    const [lilGuySelection, setLilGuySelection] = useState<number>(1);
    const [colorSelection, setColorSelection] = useState<string>("#FFF000");

    const updateSelection = (selection : number) => {
        setLilGuySelection(selection);
    }

    return (
        <>
            <p>LIL GUY SELECT</p>
            <div className="lil-guy-selection-container">
                <LilGuy onSelect={updateSelection} lilGuyIndex={1} isSelected={lilGuySelection===1} fillColor={colorSelection}/>
                <LilGuy onSelect={updateSelection} lilGuyIndex={2} isSelected={lilGuySelection===2} fillColor={colorSelection}/>
                <LilGuy onSelect={updateSelection} lilGuyIndex={3} isSelected={lilGuySelection===3} fillColor={colorSelection}/>
            </div>
        </>
    )

}

export default LilGuySelect;
