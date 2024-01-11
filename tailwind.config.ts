import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/flowbite/**/*.js",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				"jungle-green": {
					"50": "#f1fcf9",
					"100": "#cef9ec",
					"200": "#9df2d9",
					"300": "#64e4c3",
					"400": "#34cdaa",
					"500": "#1aab8c",
					"600": "#138e76",
					"700": "#137260",
					"800": "#145b4f",
					"900": "#154c42",
					"950": "#062d28",
				},
				"android-green": {
					"50": "#f8faeb",
					"100": "#f0f3d4",
					"200": "#e1e8ae",
					"300": "#ccd87e",
					"400": "#b5c556",
					"500": "#a0b43b",
					"600": "#768729",
					"700": "#5a6823",
					"800": "#495321",
					"900": "#3e4720",
					"950": "#20260d",
				},
				bermuda: {
					"50": "#effaf6",
					"100": "#d9f2e7",
					"200": "#b6e4d3",
					"300": "#8cd1bb",
					"400": "#54b397",
					"500": "#32977e",
					"600": "#227965",
					"700": "#1b6152",
					"800": "#184d42",
					"900": "#144037",
					"950": "#0a2420",
				},
				"yellow-green": {
					"50": "#f9fbea",
					"100": "#f0f5d2",
					"200": "#e0eda9",
					"300": "#cce07c",
					"400": "#b2ce4d",
					"500": "#95b32f",
					"600": "#738f21",
					"700": "#586d1e",
					"800": "#48571d",
					"900": "#3d4b1c",
					"950": "#1f280b",
				},
			},
		},
	},
	plugins: [
		require("flowbite/plugin")({
			charts: true,
		}),
	],
};
export default config;
