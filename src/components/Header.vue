
<template>
     <div class="toolBar">
        <Toolbar>
           <template #start>
                <Button  icon="pi pi-bars" class="mr-2" />
                 </template>
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
import Button from 'primevue/button';

// Import des librairies css pour primevue
import "primevue/resources/themes/lara-light-indigo/theme.css";  //theme   
import "primevue/resources/primevue.min.css";  //core
import "primeicons/primeicons.css"; //icons

export default {
    name: 'menuComponent',

    components: {
        Toolbar,
        SelectButton,
        Button
    },

    data() {
        return {
                    
          value : ref('Gâvres'),
          options : ref(['Gâvres', 'Arcachon'])
  
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
    padding: 0.5rem;
    border-radius: 6px;
    gap: 0.5rem;
}

</style>
