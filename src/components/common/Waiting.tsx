import React from "react";
import '../../styles/text-animations.css'

interface WaitingProps {
    message: string;
    description?: string;
}

const Waiting: React.FC<WaitingProps> = ({ message, description }) => {

    return (
        <>
            <div className="container">
                <p className="animate-pulse">
                    {message.split('').map((letter, index) => (
                        <span
                            key={index}
                            style={{ animationDelay: `${index * 0.1}s` }} // Add staggered animation delay
                        >
                            {letter}
                        </span>
                    ))}
                </p>
                {description && <p className="weaker">{`(${description})`}</p>}
            </div>
        </>
    );
}

export default Waiting;
