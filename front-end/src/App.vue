<template>
  <div id="app">
      <!-- May need this for future scalability -->
    <router-view/>
  </div>
</template>

<style lang="scss">
html { font-size: 18px; }
body { padding: 1rem; }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
