// GameContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { GameData, GameState } from "../components/types/GameDataTypes";

// Define the shape of the context
interface GameContextType {
    gameData: GameData;
    updateGameData: (updates: Partial<GameData>) => void;
}

// Create the context
const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [gameData, setGameData] = useState<GameData>({
        gameId: "",
        gameState: null,
        timerEnd: null,
        roundCount: 0,
    });

    // Generalized update function
    const updateGameData = (updates: Partial<GameData>) => {
        setGameData((prev) => ({ ...prev, ...updates }));
    };

    return (
        <GameContext.Provider value={{ gameData, updateGameData }}>
            {children}
        </GameContext.Provider>
    );
};

// Custom hook for consuming the context
export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGame must be used within a GameProvider");
    }
    return context;
};
