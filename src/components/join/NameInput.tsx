import React, { useEffect, useState } from "react";

interface NameInputProps {
    onNext: (name:string)=> void;
}

const NameInput: React.FC<NameInputProps> = ({
    onNext
}) => {
    const [nameInput, setNameInput] = useState<string>("");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const maxNameLength = 15;

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        if (newValue.length <= maxNameLength) setNameInput(newValue);
     };


    return (
        <>
            <h2 className="fun">enter your name:</h2>
            <input type="text" className="big-input" value={nameInput} onChange={handleInputChange} />
            <p className="character-count">{`${nameInput.length}/${maxNameLength}`}</p>
            <button className="big-button" onClick={() => onNext(nameInput)}>Next Step</button>
        </>
    )
}

export default NameInput;