import React, { useState } from "react";

interface NameInputProps {
    onNext: (name:string)=> void;
}

const NameInput: React.FC<NameInputProps> = ({
    onNext
}) => {
    const [nameInput, setNameInput] = useState<string>("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setNameInput(newValue);
     };


    return (
        <>
            <h2>Enter name:</h2>
            <input type="text" className="big-input" value={nameInput} onChange={handleInputChange} />
            <button className="big-button" onClick={() => onNext(nameInput)}>Next Step</button>
        </>
    )
}

export default NameInput;