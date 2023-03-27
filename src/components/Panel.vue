<template>

    
    <div class="buttonPanel">
        <Button  v-styleclass="{ selector: '.test', toggleClass: 'p-hidden' }" type="button" icon="pi pi-bars" label="" />
    </div>

    <div class="test">
    
        <div class="card flex flex-column align-items-center">
                <div>
                    <Button v-styleclass="{ selector: '.box', enterClass: 'hidden', enterActiveClass: 'my-fadein' }" label="Show" class="mr-2" />
                    <Button v-styleclass="{ selector: '.box', leaveActiveClass: 'my-fadeout', leaveToClass: 'hidden' }" label="Hide" />
                </div>
                <div class="hidden animation-duration-500 box">
                    <div class="flex bg-green-500 text-white align-items-center justify-content-center py-3 border-round-md mt-3 font-bold shadow-2 w-8rem h-8rem">Content</div>
                </div>
            </div>

    </div>


  
<!-- Panel de gauche -->

        <OverlayPanel ref="op" class="card">
        <!-- Texte présent dedans -->
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
       
        <!-- Ajout d'une checkbox pour voir si l'ajout d'élément fonctionne -->
            <Checkbox v-model="checked" :binary="true" />
            
    </OverlayPanel>

</template>

<script>




// import Fieldset from 'primevue/fieldset';
import Checkbox from 'primevue/checkbox';
import OverlayPanel from 'primevue/overlaypanel';

import Button from 'primevue/button';

// Import des librairies css pour primevue
import "primevue/resources/themes/lara-light-indigo/theme.css";  //theme   
import "primevue/resources/primevue.min.css";  //core
import "primeicons/primeicons.css"; //icons

import { ref } from "vue";

export default {
    name: 'panelComponent',

    components: {
        // Fieldset,
         Checkbox,
        Button,
        OverlayPanel,
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


.box {
    background-color: var(--green-500);
    color: #ffffff;
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-radius: 4px;
    margin-top: 1rem;
    font-weight: bold;
    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
}

@keyframes my-fadein {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes my-fadeout {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

.my-fadein {
    animation: my-fadein 150ms linear;
}

.my-fadeout {
    animation: my-fadeout 150ms linear;
}
</style>
