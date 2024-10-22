import { ColorMapping, ColorOption } from "../components/types/ColorMappingType";

const colorMappings: { [key: string]: ColorMapping } = {
    "RED": { main: "#FF0000", text: "#FFCCCC", bg: "#770000", alt: "#ff916f" }, // Red
    "YELLOW": { main: "#FFFF00", text: "#252410", bg: "#d7d614", alt: "#ffff90" }, // Yellow → Darker Yellow
    "GREEN": { main: "#00FF00", text: "#d4ffc7", bg: "#226619", alt: "#d4ffc7" }, // Green → Lighter Green
    // "#00FFFF": { text: "#66FFFF" }, // Cyan → Lighter Cyan
    // "#FF00FF": { text: "#FF66FF" }, // Magenta → Lighter Magenta
    // "#FFA500": { text: "#FFB347" }, // Orange → Lighter Orange
    // "#008000": { text: "#006400" }, // Dark Green → Darker Dark Green
    // "#0000FF": { text: "#6666FF" }, // Blue → Lighter Blue
    "PURPLE": { main: "#a65bdc", text: "#c8a3ea", bg: "#31065C", alt: "#000000" }, // Purple → Lighter Purple
};

export const getColorScheme = (colorName: string): ColorMapping => {
    // Check if the color exists in colorMappings
    const mapping = colorMappings[colorName];
    // Return the altColor1 if it exists, otherwise return undefined
    if (mapping) {
        return mapping;
    }
    else {
        return colorMappings["PURPLE"]
    }
};

export const getColorOptions = (): ColorOption[] => {
    return Object.entries(colorMappings).map(([key, mapping]) => ({
        name: key, // The key (color hex) as the name
        hex: mapping.main,
    }));
};

export const getHex = ( colorName : string ): string => {
    return getColorScheme(colorName).main;
}
