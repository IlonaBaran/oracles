<template>

    <Header ></Header>
    <Map></Map>
    <Footer></Footer>
    <Toolbar></Toolbar>

</template>

<script>

// Import de la bibliothèque primevue



import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Map from './components/Map.vue'
import Toolbar from './components/Toolbar.vue'

export default {
  name: 'App',
 
  components: {
    Header,
    Map,
    Footer,
    Toolbar,
  }
}
</script>

<style>
html, body{
  margin:0px;
  overflow: hidden;
  overflow: hidden;
  background-color: white;
}
#app {margin: 0px;
 display: flex;
 flex-direction: column;
 height: 100vh;
}

Header{
  height:10px;
}

</style>
