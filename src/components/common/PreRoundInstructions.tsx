import React, { useEffect, useState } from "react";
import '../../styles/game-flow.css';
import { GameData } from "../types/GameDataTypes";
import { useGame } from "../../contexts/GameContext";

type PreRoundInstructions = {
    phase: string;
    title: string;
    descriptionA: string;
    descriptionB: string;
    descriptionC: string;
}

const PreRoundInstructions: React.FC = () => {

    const { gameData } = useGame();

    //default to question phase instructions
    const [instructions, setInstructions] = useState<PreRoundInstructions>({
        phase: "PHASE ONE",
        title: "QUESTION",
        descriptionA: "Ask a fun question for your friends to answer.",
        descriptionB: "Open-ended questions are best...",
        descriptionC: "Try not to limit the potential for creative answers!"
    });
    
    useEffect(() => {
        const rootElement = document.getElementById("root");
        if (rootElement) {
                    rootElement.classList.add('no-dots');
        }

        switch (gameData.gameState) {
            case ('PRE_ANSWER'):
                setInstructions({
                    phase: "PHASE TWO",
                    title: "ANSWER",
                    descriptionA: "Answer two questions from your friends.",
                    descriptionB: "Try to make everyone laugh!",
                    descriptionC: "You'll score points for having the funniest answer."
                });
                break;
            case ('PRE_VOTE'):
                setInstructions({
                    phase: "PHASE THREE",
                    title: "VOTE",
                    descriptionA: "Vote on the funniest answer for each question.",
                    descriptionB: "Each vote is worth one point.",
                    descriptionC: "Votes will be tallied up at the end of the round!"
                });
                break;
        }

        return () => {
            if (rootElement) {
                rootElement.classList.remove('no-dots');
            }
        };

    }, []);


    


    return (
        <>
            <div className="container invisible-container">
                <h6 className="game-flow slide-in-from-left">
                    {instructions.phase}
                </h6>
                <h1 className="game-flow slide-in-from-left">
                    {instructions.title}
                </h1>
                <h3 className="game-flow slide-in-from-left"
                    style={{animationDelay: '1s'}}>
                    {instructions.descriptionA}
                </h3>
                <h4 className="game-flow slide-in-from-left"
                    style={{animationDelay: '3s'}}>
                    {instructions.descriptionB}
                </h4>
                <h4 className="game-flow slide-in-from-left"
                    style={{animationDelay: '4.5s'}}>
                    {instructions.descriptionC}
                </h4>
            </div>
        </>
    )
}

export default PreRoundInstructions;