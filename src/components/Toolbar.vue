<template>
  <div class="toolbar">
    <!-- <button @click="toggleLegend" class="button">{{ legend }}</button> -->
  </div>
  <div class="dial">
    <SpeedDial :model="items" direction="down" :style="{ top: 'calc(5% + 36px)', right: 'calc(5px)' }"
      class="right-0 top-0" :tooltipOptions="{ position: 'right' }" />
  </div>
  <Sidebar class='sidebar' v-model:visible="visibleRight" position="right">
    <h2>Fonds de carte</h2>
    <div class="typeCartes">

      <Button id="boutonCarte" class="bg-bluegray-600 hover:bg-bluegray-400 border-bluegray-700 ">
        <img alt="logo" src="../../public/img/ortho.png" class="h-2rem" />
      </Button>

      <Button id="boutonCarte" class="bg-bluegray-600 hover:bg-bluegray-400 border-bluegray-700">
        <img alt="logo" src="../../public/img/plan.png" class="h-2rem" />
      </Button>

    </div>
  </Sidebar>
</template>
  


<script>

import SpeedDial from 'primevue/speeddial';
import Sidebar from 'primevue/sidebar';
import Button from 'primevue/button';


export default {
  name: 'Toolbar-box',
  components: {
    SpeedDial,
    Sidebar,
    Button
  },
  data() {
    return {
      is2D: true,
      legend2D: '2D',
      legend3D: '3D',
      visibleRight: false,

      items: [
        {
          label: 'Change Map',
          icon: 'pi pi-map',
          command: () => {
            this.visibleRight = true;
          }
        },
        {
          label: 'Delete',
          icon: 'pi pi-trash',
          command: () => {
          }
        },
      ]
    }
  },
  computed: {
    legend() {
      // Return the appropriate legend based on the boolean value of is2D
      return this.is2D ? this.legend2D : this.legend3D;
    }
  },
  methods: {
    toggleLegend() {
      // Toggle the boolean value of is2D
      this.is2D = !this.is2D;
    }
  }
}
</script>
  
<style>
.button {
  display: inline-block;
  padding: 10px 15px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: #6366f1;
  border: none;
  border-radius: 2px;
  box-shadow: 0 9px #999;
  position: fixed;
  bottom: 5%;
  right: 2%;
}

.button:hover {
  background-color: #6366f1
}

.button:active {
  background-color: #6366f1;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}

.toolbar {
  z-index: 2;
}

.dial {
  z-index: 2;

}

.sidebar {
  z-index: 2;
}

.typeCartes {
  display: flex;
  align-items: center;
  flex-direction: column;
}

img {
  width: 100%;

}

#boutonCarte {
  margin: 5%;
  padding: 0%;
}
</style>

