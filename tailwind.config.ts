import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                inactive: "#B2B2B2",
                primary: "#262626",
                secondary: "#18181a",
                spotify: "#1DB954",
                type: "#B3B3B3",
                skeleton: {
                    base: "#2a2a2a",
                    content: "#242424",
                    artist: "rgba(115, 115, 115, 0.2)",
                },
            },
        },
    },
};
export default config;
