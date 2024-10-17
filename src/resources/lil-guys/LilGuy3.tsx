import React from "react";

interface LilGuy3Props {
    fillColor: string;
}

const LilGuy3: React.FC<LilGuy3Props> = ({ fillColor }) => {
    return (
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
            <g id="Layer_1">
                <title>Layer 1</title>
                <ellipse
                    stroke-width="6"
                    ry="45"
                    rx="45"
                    id="svg_1"
                    cy="50"
                    cx="50"
                    stroke="#000"
                    fill={fillColor}
                />
                <ellipse
                    ry="1"
                    rx="1"
                    id="svg_3"
                    cy="33"
                    cx="33"
                    stroke-width="10"
                    stroke="#000"
                />
                <ellipse
                    ry="1"
                    rx="1"
                    id="svg_5"
                    cy="32.75309"
                    cx="66"
                    stroke-width="10"
                    stroke="#000"
                />
                <path
                    d="m27.16049,62.83951c0,0 0.24691,0 5.4321,0c8.14815,0 20,0 35.30864,0l4.93827,0l1.9753,0l0.24692,0"
                    id="svg_16"
                    stroke-width="10"
                    stroke="#000"
                    fill="none"
                />
            </g>
        </svg>
    );
};

export default LilGuy3;
