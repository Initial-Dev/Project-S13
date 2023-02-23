/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./app/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {},
		fontFamily: {
			skmodernistbold: ['Sk-Modernist-Bold'],
			skmodernistmono: ['Sk-Modernist-Mono'],
			skmodernistregular: ['Sk-Modernist-Regular'],
		},
	},
	plugins: [
		require('vidstack/tailwind.cjs'),
		require('@tailwindcss/forms'),
		require('tailwindcss-filters'),
	],
};
