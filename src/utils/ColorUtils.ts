const colorOptions: { [key: string]: string } = {
    "RED": "#FF0000",
    "ORANGE": "#ff7b00",
    "YELLOW": "#FFFF00",
    "MAGENTA": "#FF00FF",
    "GREEN": "#00FF00",
    "CYAN": "#66FFFF",
    "PURPLE": "#a65bdc",
    "DARK_GREEN": "#008000",
    "BLUE": "#1667ff",
};

export const getColorOptions = () => {
    return Object.entries(colorOptions).map(([key, mapping]) => ({
        name: key, // The key (color hex) as the name
        hex: mapping,
    }));
};

export const getHex = (color: string) => {
    const hex = colorOptions[color.toUpperCase()];
    return hex || colorOptions["PURPLE"]; // Return purple default if the color is not found
};