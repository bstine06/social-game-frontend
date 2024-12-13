import { ColorMapping, ColorOption } from "../components/types/ColorMappingType";

const colorMappings: { [key: string]: ColorMapping } = {
    "RED": { main: "#FF0000", text: "#FFCCCC", bg: "#770000", alt: "#ff916f" }, // Red
    "YELLOW": { main: "#FFFF00", text: "#252410", bg: "#d7d614", alt: "#ffff90" }, // Yellow → Darker Yellow
    "GREEN": { main: "#00FF00", text: "#d4ffc7", bg: "#00AA00", alt: "#d4ffc7" }, // Green → Lighter Green
    "CYAN": { main: "#66FFFF", text: "#003399", bg: "#66FFFF", alt: "#d4ffc7" }, // Cyan → Lighter Cyan
    "MAGENTA": { main: "#FF00FF", text: "#FFDDFF", bg: "#FF00FF", alt: "#FFDDFF" }, // Magenta → Lighter Magenta
    "ORANGE": { main: "#ff7b00", text: "#FFFFFF", bg: "#ff7b00", alt: "#FFA500" }, // Orange → Lighter Orange
    "DARK_GREEN": { main: "#008000", text: "#DDFFAA", bg: "#008000", alt: "#008000" }, // Dark Green → Darker Dark Green
    "BLUE": { main: "#0000FF", text: "#EEFFFF", bg: "#0000FF", alt: "#0000FF" }, // Blue → Lighter Blue
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
        // default to purple if there is an erroneous call to this function
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
