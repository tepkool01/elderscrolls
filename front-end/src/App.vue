<template>
    <div id="app">
        <!-- May need this for future scalability -->
        <router-view/>
    </div>
</template>

<style lang="scss">
$grey-100: #f4f5f7;

html {
	font-size: 16px;
}

body {
	background: $grey-100;
	padding: 1rem;
}

#app {
	font-family: system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Arial,sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
