import React, {useState} from "react";
import he from 'he';
import Timer from "../common/Timer";
import { GameData } from "../types/GameDataTypes";

interface PlayerConversationInputProps {
    instructions: string;
    gameData: GameData;
    prompt?: string;
    onSubmit: (content: string) => void;
}

const PlayerConversationInput: React.FC<PlayerConversationInputProps> = ({
    instructions,
    gameData,
    prompt,
    onSubmit
}) => {
    const [input, setInput] = useState<string>("");

    const maxInputLength = 80;

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        if (newValue.length <= maxInputLength) setInput(newValue);
    };

    const handleSubmit = async () => {
        onSubmit(input);
        setInput("");
    }

    return (
        <>
            <p>{instructions}</p>
            {prompt && <p><strong>{he.decode(prompt)}</strong></p>}
            <textarea className="conversation-input" value={input} onChange={handleInputChange} />
            <p className="character-count">{`${input.length}/${maxInputLength}`}</p>
            <div className="flex-split">
                <button className="big-button" disabled={!input} onClick={handleSubmit}>Submit</button>
                <Timer gameData={gameData}/>
            </div>
        </>
    )

}

export default PlayerConversationInput;