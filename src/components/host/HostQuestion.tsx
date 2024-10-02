import React from 'react';

interface HostQuestionProps {
    onCancelHost: () => void;
}

const HostQuestion: React.FC<HostQuestionProps> = ({ onCancelHost }) => {
    
    return (
        <>
        <div className="container">
            <p>Enter a question on your device for your friends to answer</p>
            </div>
        </>
    )

}

export default HostQuestion;