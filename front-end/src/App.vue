<template>
    <div id="app">
        <!-- May need this for future scalability -->
        <router-view/>
    </div>
</template>

<style lang="scss">
$background: #F5F5F5;
html {
    font-size: 16px;
}

body {
    background: $background;
    padding: 1rem;
}

#app {
    font-family: Poppins, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
