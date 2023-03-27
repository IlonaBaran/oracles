<template>

    
    <div class="buttonPanel">
        <Button  v-styleclass="{ selector: '.card', toggleClass: 'p-hidden' }" type="button" icon="pi pi-bars" label="" />
    </div>

    <!-- Panel de gauche -->
    <div class="card p-hidden">
        <!-- Texte présent dedans -->
        <Card>

      <template #title> Options </template>
            <template #content>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque
                    quas!
                </p>
                 <!-- Ajout d'une checkbox pour voir si l'ajout d'élément fonctionne -->
            <Checkbox v-model="checked" :binary="true" />
        
            </template>
        
        </Card>
    </div>

</template>

<script>




// import Fieldset from 'primevue/fieldset';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import Card from 'primevue/card';

import { ref } from "vue";

export default {
    name: 'panelComponent',

    components: {
        Checkbox,
        Button,
        Card
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
#app .p-card .p-card-title{
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 0.5rem;

}
p{
    margin: 0px;

}
</style>
