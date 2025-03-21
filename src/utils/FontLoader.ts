export function loadFonts() {
    const font = new FontFace("Eracake", "url(../fonts/Eracake.otf)");

    font.load().then(() => {
        document.fonts.add(font);
        document.documentElement.classList.add("font-loaded");
        console.log("Font loaded successfully!");
    }).catch((err) => {
        console.error("Failed to load font:", err);
    });
}
