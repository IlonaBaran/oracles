<template>
  <Header @selectedScenarioChanged="handleSelectedScenarioChanged"></Header>
  <Map :selectedScenario="this.selectedScenario"></Map>
  <Footer></Footer>
</template>

<script>

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Map from './components/Map.vue'

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
    handleSelectedScenarioChanged(selectedScenario) {
      this.selectedScenario = selectedScenario;
      console.log("received selected scenarios in app")
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
