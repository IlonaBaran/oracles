<template>
    <Header ></Header>
    <Panel></Panel>

    <Map></Map>
    <Footer></Footer>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Map from './components/Map.vue'
import Panel from './components/Panel.vue'



export default {
  name: 'App',
  components: {
    Header,
    Map,
    Footer,
    Panel
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
 display: flex;
 flex-direction: column;
 height: 100vh;
}

</style>
