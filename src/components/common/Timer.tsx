import React, { useEffect, useState } from "react";
import { GameData } from "../types/GameDataTypes";

interface TimerProps {
    gameData: GameData;
}

const Timer: React.FC<TimerProps> = ({ gameData }) => {
    const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
    const [isTimeExpired, setIsTimeExpired] = useState<boolean>(false);

    useEffect(() => {
        const timerEnd = gameData.timerEnd;
        if (timerEnd === null) {
            return;
        }
    
        // Run the timer logic immediately at time 0
        const initialRemainingTime = getRelativeTimeInSeconds(timerEnd);
        setTimeRemaining(initialRemainingTime);
        if (initialRemainingTime <= 0) {
            setIsTimeExpired(true);
            return; // Exit early if time is already expired
        }
    
        // Set up the interval to update every second
        const intervalId = setInterval(() => {
            const remainingTime = getRelativeTimeInSeconds(timerEnd);
            setTimeRemaining(remainingTime);
    
            if (remainingTime <= 0) {
                setIsTimeExpired(true);
                clearInterval(intervalId); // Stop updates once time is up
            }
        }, 1000);
    
        // Clean up the interval on component unmount or when timerEnd changes
        return () => {
            clearInterval(intervalId);
            setIsTimeExpired(false); // Reset expired flag
            setTimeRemaining(null);   // Reset time remaining
        };
    }, [gameData.timerEnd]);
    
    

    function getRelativeTimeInSeconds(timerEnd: string) {
        const now = Date.now();
        const endTime = new Date(timerEnd).getTime(); // Convert the ISO string to a timestamp
        const differenceInSeconds = Math.floor((endTime - now) / 1000); // Calculate remaining time in seconds
        return differenceInSeconds;
    }

    const renderComponent = () => {
        if (!isTimeExpired) {
            if (timeRemaining !== null) {
                return (
                    <p className="header-main-text">{timeRemaining}</p>
                )
            }
        } else {
            return (
                <p className="header-main-text">Time!</p>
            )
        }
    }

    return (
        renderComponent()
    );
};

export default Timer;
