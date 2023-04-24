<template>
  <!-- Dial permettant l'affichage des différents outils et paramètres de la carte  -->
  <div class="dial">
    <SpeedDial :model="items" direction="down" :style="{ top: 'calc(5% + 36px)', right: 'calc(5px)' }"
      class="right-0 top-0" :tooltipOptions="{ position: 'right' }" />
  </div>
</template>
  


<script>
/* eslint-disable */
import { ref } from "vue";
import Header from './Header.vue';
import App from '../App.vue';
import SpeedDial from 'primevue/speeddial';


export default {
  name: 'Toolbar-box',
  components: {
    /**
     * Cette méthode change la valeur de la propriété `mapSelected` à "ortho".
     */
    SpeedDial
  },
//   props: {
//     selectedScenario: {
//       type: Object,
//       required: true
//     },
//     test: {
//       type: Object,
//       required: true
//     },
//     testB77777S: {
//       type: Object,
//       required: true
//     }
//   },

  methods: {
      /**
       * Gets called when the user clicks on the button
       *
       * @param {Number} num Numbers of examples
       * @public This is a public method
       */
    changeMapToOrtho(num) {
      this.mapSelected = num;
              /**
         * Success event.
         *
         * @event success
         * @type {object}
         */
        this.$emit('success', {})
    }
  }
}
</script>
  
<style>
</style>

