<template>

    
    <div class="buttonPanel">
        <Button  v-styleclass="{ selector: '.card', toggleClass: 'p-hidden' }" type="button" icon="pi pi-bars" label="" />
    </div>

    <!-- Panel de gauche -->
    <div class="card p-hidden">
        <!-- Texte présent dedans -->

        <Panel header="Panel">
            <p class="m-0 ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
                
         <!-- Ajout d'une checkbox pour voir si l'ajout d'élément fonctionne -->
            <Checkbox v-model="checked" :binary="true" />
        
        </Panel>
    </div>

</template>

<script>




// import Fieldset from 'primevue/fieldset';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import Panel from 'primevue/panel';

import { ref } from "vue";

export default {
    name: 'panelComponent',

    components: {
        Checkbox,
        Button,
        Panel
    },

    data() {
        return {
            checked : ref(false),
            checkedPanel : ref(false),
}
        
    },

  methods: {
        toggle(event) {
            this.$refs.op.toggle(event);
        }
    }

}

</script>


<style>
.buttonPanel{
 z-index: 2;
    position: absolute;
    top:1%;
left:1%
    
}
.card{
    z-index: 3;
    position: absolute;
    width:25%;
    top:10%;
}
.test{
    z-index: 3;
    position: absolute;
    width:25%;
    top:10%;
}


</style>
