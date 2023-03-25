<template>
<!-- Panel de gauche -->
    <div class="card">
        <Fieldset legend="Panel" :toggleable="true">
        <!-- Texte présent dedans -->
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
       
        <!-- Ajout d'une checkbox pour voir si l'ajout d'élément fonctionne -->
            <Checkbox v-model="checked" :binary="true" />
        </Fieldset>
    </div>
</template>

<script>




import Fieldset from 'primevue/fieldset';
import Checkbox from 'primevue/checkbox';


import { ref } from "vue";


export default {
    name: 'panelComponent',

    components: {
        Fieldset,
        Checkbox
    },

    data() {
        return {
            checked : ref(false)
        }
    }
}

</script>


<style>

.card{
    z-index: 2;
    position: absolute;
    width:25%;
    top:10%;
}

</style>
