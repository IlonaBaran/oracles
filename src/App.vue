<template>
<Header ></Header>
<Map></Map>
</template>

<script>
import Header from './components/Header.vue'
import Map from './components/Map.vue'

export default {
  name: 'App',
  components: {
    Header,
    Map
  }
}
</script>

<style>
html, body{
  margin:0px;
  overflow: hidden;
  overflow: hidden;
  background-color: blue;
}
#app {margin: 0px;
 display: block;
 height: 100vh;
}
</style>
