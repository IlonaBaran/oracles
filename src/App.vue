<template>
  <Header @selectedScenarioChanged="handleSelectedScenarioChanged"></Header>
  <Map :selectedScenario="this.selectedScenario"></Map>
  <Footer></Footer>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Map from './components/Map.vue'

/**
 * TODO
 *
 * @component App
 * 
 * @author Equipe du projet Oracle - ENSG, TSI 
 * @version 1.0
 * @since 25.04.2023
 * 
 * Composants enfants : 
 * Header
 * Map
 * Footer
 * 
 * @requires ./Header.vue
 * @requires ./Map.vue
 * @requires ./Footer.vue
 */
export default {
  name: 'App',
  components: {
    Header,
    Map,
    Footer,
  },
  data() {
    return {
      selectedScenario: []
    };
  },
  methods: {
    /**
     * TODO
     *
     * @param {Array} selectedScenario TODO
     * @public This is a public method
     */
    handleSelectedScenarioChanged(selectedScenario) {
      this.selectedScenario = selectedScenario;
      this.$emit('selectedScenarioChanged', this.selectedScenario);
    }
  }
}
</script>

<style>
html,
body {
  margin: 0px;
  overflow: hidden;
  overflow: hidden;
  background-color: white;
}

#app {
  margin: 0px;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
