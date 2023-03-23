<template>
<Header ></Header>
<Map msg="yooo"/>
</template>

<script>
import Map from './components/Map.vue'
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header,
    Map
  }
}
</script>

<style>
#app {
  margin: 0px;
}
</style>
