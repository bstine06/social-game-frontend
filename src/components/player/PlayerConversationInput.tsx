import React, {useEffect, useState} from "react";
import he from 'he';
import Timer from "../common/Timer";
import { GameData } from "../types/GameDataTypes";
import OptionsModal from "../common/OptionsModal";
import ConfirmModal from "../common/ConfirmModal";
import { getQuestionHelpApi } from "../../api/questionHelpApi";
import { useGame } from "../../contexts/GameContext";

interface PlayerConversationInputProps {
    instructions: string;
    prompt?: string;
    onSubmit: (content: string) => void;
}

const PlayerConversationInput: React.FC<PlayerConversationInputProps> = ({
    instructions,
    prompt,
    onSubmit
}) => {
    const [input, setInput] = useState<string>("");
    const [helpAvailable, setHelpAvailable] = useState<boolean>(false);
    const [helpModalVisible, setHelpModalVisible] = useState<boolean>(false);
    const [confirmModalVisible, setConfirmModalVisible] = useState<boolean>(false);
    const [questionOptions, setQuestionOptions] = useState<string[]>(["","",""]);
    const { gameData } = useGame();

    const maxInputLength = 80;

    const textarea = document.querySelector('.conversation-input') as HTMLTextAreaElement;

    useEffect(() => {
        setHelpAvailable(gameData.gameState === 'QUESTION' && input.length < 3)
    }, [input])

    useEffect(() => {
        const newTextareaHeight = 4 + input.length/20;
        if (textarea) textarea.style.height = `${newTextareaHeight}em`;
    }, [input]);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value;
        if (newValue.length <= maxInputLength) setInput(newValue);
    };

    const changeTextAreaHeight = () => {
        
    }

    const handleSubmit = async () => {
        onSubmit(input);
        setInput("");
    }

    const showHelpModal = async () => {
        const questionOptionsFromServer = await getQuestionHelpApi();
        setQuestionOptions(questionOptionsFromServer);
        setHelpModalVisible(true);
    }

    const updateInputFromHelpMenu = (newText: string) => {
        setInput(newText);
        setHelpModalVisible(false);
    }

    const eraseInput = () => {
        setInput("");
        setConfirmModalVisible(false);
    }

    return (
        <>
            <p className="player-instructions">{instructions}</p>
            {prompt && <p><strong>{he.decode(prompt)}</strong></p>}
            <div style={{position:"relative"}}>
                <textarea className="conversation-input" value={input} onChange={handleInputChange} />
                {helpAvailable
                    && <button className="help-btn" onClick={showHelpModal}>help me!</button>}
                {input.length > 10
                    && <button className="help-btn" onClick={() => setConfirmModalVisible(true)}>start over</button>}
            </div>
            <p className="character-count">{`${input.length}/${maxInputLength}`}</p>
            <div className="flex-split">
                <button className="big-button" disabled={!input} onClick={handleSubmit}>Submit</button>
                <Timer/>
            </div>
            {helpModalVisible && <OptionsModal options={questionOptions} onSelection={updateInputFromHelpMenu} onClose={() => setHelpModalVisible(false)}/>}
            {confirmModalVisible && <ConfirmModal 
                                        message={"Are you sure you want to delete what you have?"}
                                        content={`"${input}"`}
                                        cancelText="No, don't erase that"
                                        confirmText="Yes, delete it!"
                                        onCancel={()=>setConfirmModalVisible(false)}
                                        onConfirm={eraseInput}
                                    />}
        </>
    )

}

export default PlayerConversationInput;