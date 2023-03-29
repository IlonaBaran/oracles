<template>
    <div class="toolbar">
      <!-- <button @click="toggleLegend" class="button">{{ legend }}</button> -->
    </div>
    <div class="dial">
      <SpeedDial  :model="items" direction="up" class="right-0 bottom-0"  :tooltipOptions="{ position: 'right' }" />
    </div>
    <Sidebar class='sidebar' v-model:visible="visibleRight" position="right">
            <h2>Right Sidebar</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </Sidebar>

  </template>
  


<script>

  import SpeedDial from 'primevue/speeddial';
  import Sidebar from 'primevue/sidebar';


  export default {
    name: 'Toolbar-box',
    components: {
        SpeedDial,
        Sidebar
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
                // this.$toast.add({ severity: 'info', summary: 'Add', detail: 'Data Added' });
                this.visibleRight=  true;

            }
        },
              {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: () => {
                // this.$toast.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
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

.button:hover {background-color: #6366f1}

.button:active {
  background-color: #6366f1;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
.toolbar{
  z-index: 2;
}

.dial{
    z-index: 2;
    position: absolute;
    bottom: 28%;
    right: 6%;
}

.sidebar{
    z-index: 2;}

</style>

