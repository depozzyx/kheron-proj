export interface LayoutTheme {
    color_bg: string;
    color_accent: string;
    color_body?: string;
}

export const LayoutThemes = {
    blue_violet: { color_bg: "#9173e4", color_accent: "#74abfd" },
    dirt: { color_bg: "#4aa06c", color_accent: "#dfa267" },
    confident: {
        color_bg: "#1c1d1e",
        color_accent: "#414344",
        color_body: "#1c1d1ebd",
    },
};

type HexColor = string;
type RgbColor = string;
export const rgb = (hex: HexColor): RgbColor => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? result
              .splice(1)
              .map((value) => parseInt(value, 16))
              .join(", ")
        : "";
};
