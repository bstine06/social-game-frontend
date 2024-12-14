// ThemeContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Type for the color (can be extended if needed)
type ThemeColor = string;

// Define the shape of the context
interface ThemeContextType {
    themeColor: ThemeColor;
    setThemeColor: (color: ThemeColor) => void;
}

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    
    const [themeColor, setThemeColor] = useState<ThemeColor>("PURPLE"); // Default color
    
    useEffect(() => {
        document.body.setAttribute("data-theme", themeColor);
    }, [themeColor]);

    return (
        <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook for consuming the context
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
