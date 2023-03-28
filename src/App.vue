<template>

    <Header ></Header>
    <Panel></Panel>
    <Map></Map>
    <Footer></Footer>
    <Toolbar></Toolbar>

</template>

<script>

// Import de la bibliothèque primevue
import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
const app = createApp(createApp);
app.use(PrimeVue);

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Map from './components/Map.vue'
import Panel from './components/Panel.vue'
import Toolbar from './components/Toolbar.vue'

// Import des librairies css pour primevue
import "primevue/resources/themes/lara-light-indigo/theme.css";  //theme   
import "primevue/resources/primevue.min.css";  //core
import "primeicons/primeicons.css"; //icons

export default {
  name: 'App',
  components: {
    Header,
    Map,
    Footer,
    Panel,
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

</style>
