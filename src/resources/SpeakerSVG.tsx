import React from "react";

interface SpeakerSVGProps {
    active: boolean;
}

const SpeakerSVG: React.FC<SpeakerSVGProps> = ({ active }) => {
    const renderSVG = () => {
        if (active) {
            return (
                <svg
                    className="responsive-svg icon-svg"
                    width="800px"
                    height="800px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path 
                        d="M16 9C16.5 9.5 17 10.5 17 12C17 13.5 16.5 14.5 16 15M19 6C20.5 7.5 21 10 21 12C21 14 20.5 16.5 19 18M13 3L7 8H5C3.89543 8 3 8.89543 3 10V14C3 15.1046 3.89543 16 5 16H7L13 21V3Z" 
                        
                    />
                </svg>
            );
        } else {
            return (
                <svg
                    className="responsive-svg icon-svg"
                    width="800px"
                    height="800px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M16 9L22 15M22 9L16 15M13 3L7 8H5C3.89543 8 3 8.89543 3 10V14C3 15.1046 3.89543 16 5 16H7L13 21V3Z"
                        
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            );
        }
    };

    return <>{renderSVG()}</>;
};

export default SpeakerSVG;
