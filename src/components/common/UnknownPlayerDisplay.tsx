import React from "react";
import PlayerDisplay from "./PlayerDisplay";

interface UnknownPlayerDisplayProps {
    purpose: string;
}

const UnknownPlayerDisplay: React.FC<UnknownPlayerDisplayProps> = ({ purpose }) => {

    const unknownQuestionPlayer = {
        playerId: "unknown",
        name: "",
        shape: 99,
        color: "#FFF"
    }

    const unknownAnswerPlayer = {
        playerId: "unknown",
        name: "",
        shape: 98,
        color: "#FFF"
    }

    const renderComponent = () => {
        switch (purpose) {
            case "QUESTION":
                return (
                    <PlayerDisplay player={unknownQuestionPlayer} />
                )
            case "ANSWER":
                return (
                    <PlayerDisplay player={unknownAnswerPlayer} />
                )
        }
    }

    return (
        renderComponent()
    );

}

export default UnknownPlayerDisplay;