/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
	theme: {
		extend: {
			fontFamily: {
				roboto: ['Roboto']
			  }
		},
	},
	plugins: [...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')(), require('@tailwindcss/forms')],
}
