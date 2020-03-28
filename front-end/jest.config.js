module.exports = {
	preset: '@vue/cli-plugin-unit-jest',
	collectCoverage: true,
	collectCoverageFrom: [
		'src/**/*.{js,vue}',
		'!src/main.js',
		'!src/router/index.js',
		'!src/store/index.js',
		'!src/api/index.js',
		'!src/App.vue',
	],
	"modulePaths": [
		"./src",
	],
};
