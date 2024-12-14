import React, { useEffect, useState } from "react";
import { GameData } from "../types/GameDataTypes";

interface TimerProps {
    gameData: GameData;
    isVisible?: boolean;
}

const Timer: React.FC<TimerProps> = ({ gameData, isVisible=true }) => {
    const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
    const [isTimeExpired, setIsTimeExpired] = useState<boolean>(false);

    useEffect(() => {
        const timerEnd = gameData.timerEnd;
        if (!timerEnd) return;

        const expireTimerAndTryUpdateState = async () => {
            setIsTimeExpired(true);
        };

        const getRelativeTimeInSeconds = (timerEnd: string) => {
            const now = Date.now();
            const endTime = new Date(timerEnd).getTime(); // Convert ISO string to timestamp
            const differenceInSeconds = Math.floor((endTime - now) / 1000); // Remaining time in seconds
            return differenceInSeconds;
        };

        // Run the timer logic immediately at time 0
        const initialRemainingTime = getRelativeTimeInSeconds(timerEnd);
        setTimeRemaining(initialRemainingTime);

        if (initialRemainingTime <= 0) {
            expireTimerAndTryUpdateState();
            return; // Exit early if the time has already expired
        }

        // Set up the interval to update every second
        const intervalId = setInterval(() => {
            const remainingTime = getRelativeTimeInSeconds(timerEnd);
            setTimeRemaining(remainingTime);

            if (remainingTime <= 0) {
                expireTimerAndTryUpdateState();
                clearInterval(intervalId); // Stop updates once time is up
            }
        }, 1000);

        // Cleanup on component unmount or when timerEnd changes
        return () => {
            clearInterval(intervalId);
            setIsTimeExpired(false); // Reset expired flag
            setTimeRemaining(null); // Reset time remaining
        };
    }, [gameData.timerEnd]);

    // Ensure the time never goes below 00
    const formattedTime = timeRemaining !== null && timeRemaining > 0 
        ? String(timeRemaining).padStart(2, '0') 
        : '00';

    return (
        <>
        {isVisible && 
            <div className="timer">
                <p>{formattedTime}</p>
            </div>
        }
        </>
    );
};

export default Timer;
