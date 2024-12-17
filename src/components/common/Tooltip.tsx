import React, { useEffect, useState } from "react";
import "../../styles/tooltip.css";

interface TooltipProps {
    children: React.ReactElement;
    message: string;
}

const Tooltip: React.FC<TooltipProps> = ({children, message}) => {
    
    const [isTooltipVisible, setTooltipVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTooltipVisible(false);
        }, 2000);
        // Cleanup the timer when the component unmounts
        return () => clearTimeout(timer);
    }, []);

    const handleChildClick = () => {
        setTooltipVisible(false); // Hide the tooltip on click
    };
    
    return (
        <div className="tooltip-container">
            <div 
                className="tooltip-children"
                onClick={handleChildClick}
            >
                {children}
                    <div className={`tooltip ${isTooltipVisible ? '' : 'invisible'}`}>
                        <span>{message}</span>
                    </div>
                
            </div>
        </div>
    )
}

export default Tooltip;