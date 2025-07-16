/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from 'tailwindcss';
// This file is used to configure Tailwind CSS for the project.
const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    plugins: [require('tailwindcss-animate')],
    theme: {
        extend: {
            keyframes: {
                'fade-in-from-top': {
                    from: { opacity: '0', transform: 'translateY(-16px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                'header-from-top': {
                    from: { transform: 'translateY(-100%)' },
                    to: { transform: 'translateY(0)' },
                },
            },
            animation: {
                'fade-in-from-top': 'fade-in-from-top 0.5s ease-out',
                'header-from-top': 'header-from-top 0.5s ease-out',
            },
        },
    },
};
export default config;