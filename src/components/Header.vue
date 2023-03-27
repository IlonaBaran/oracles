
<template>
  <div class="toolBar">
  <Toolbar style="padding:5px0px;
">

    <template #center>
     <SelectButton v-model="value" :options="options" aria-labelledby="basic" />
    </template>
  </Toolbar>
  </div>
</template>

<script>
import { ref } from "vue";

import Toolbar from 'primevue/toolbar';
import SelectButton from 'primevue/selectbutton';
// import ToggleButton from 'primevue/togglebutton';



export default {
    name: 'menuComponent',

    components: {
        Toolbar,
        SelectButton,
        // ToggleButton,
    },

    data() {
        return {
                    
          value : ref('Gâvres'),
          options : ref(['Gâvres', 'Arcachon']),
          checked : ref(false),

        }
    }
}


</script>

<style>

.toolBar{
    z-index: 2;
    position: absolute;
    width:100%;
    height:5px;
    top:0%;
}

.p-toolbar {
    background: white;
    border: 1px solid #dee2e6;
    padding: 0px;
    border-radius: 6px;
    gap: 0.5rem;
}
.p-toolbar .p-component{
      margin: 0px;

}
.p-component{

      padding: 0px;

}
</style>
