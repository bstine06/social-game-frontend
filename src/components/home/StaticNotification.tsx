import React from "react";

interface StaticNotificationProps {
    message: string;
    buttonText: string;
    onButtonPress: () => void;
}

const StaticNotification: React.FC<StaticNotificationProps> = ({ message, onButtonPress, buttonText }) => {
    
    return (
        <>
            <div className="container horizontal-flex">
                <p className="subheading">!</p>
                <p className="description">
                    {message}
                </p>
                <button onClick={onButtonPress} className="big-button">{buttonText}</button>
            </div>
        </>
    )

}

export default StaticNotification;