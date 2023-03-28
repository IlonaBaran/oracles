<template>

    
    <div class="buttonPanel">
        <Button  v-styleclass="{ selector: '.card', toggleClass: 'p-hidden' }" type="button" icon="pi pi-bars" label="" />
    <MultiSelect v-model="selectedCities" :options="cities" filter optionLabel="name" placeholder="Sélection Scénarios"  
                    :maxSelectedLabels="3" class="w-full md:w-20rem selectScenario" />
                    <CascadeSelect v-model="selectedCity" :options="countries" optionLabel="cname" optionGroupLabel="name"
                :optionGroupChildren="['states', 'cities']" style="min-width: 14rem" placeholder="Sélection Graphique" class="selectGraph" />
               
    </div>

    <!-- Panel de gauche -->
    <div class="card p-hidden">

        <!-- Texte présent dedans -->
        <Card>

                <template #title>
                    Options 
                </template>

                <template #subtitle>
                     </template>

                <template #content>
                    <ScrollPanel style="width: 100%; height: 550px">

                     <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
                voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
            </p>
            <p class="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui
                officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
            </p>
                    <!-- Ajout d'une checkbox pour voir si l'ajout d'élément fonctionne -->
                    <Checkbox v-model="checked" :binary="true" />
                                </ScrollPanel>

                </template>
        </Card>
    </div>

</template>

<script>




// import Fieldset from 'primevue/fieldset';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';
import Card from 'primevue/card';
import MultiSelect from 'primevue/multiselect';
import CascadeSelect from 'primevue/cascadeselect';
import ScrollPanel from 'primevue/scrollpanel';

import { ref } from "vue";

export default {
    name: 'panelComponent',

    components: {
        Checkbox,
        Button,
        Card,
        MultiSelect,
        CascadeSelect,
        ScrollPanel
    },

    data() {
        return {
            checked : ref(false),
            checkedPanel : ref(false),
            selectedCities: null,
            cities: [
                { name: 'New York', code: 'NY' },
                { name: 'Rome', code: 'RM' },
                { name: 'London', code: 'LDN' },
                { name: 'Istanbul', code: 'IST' },
                { name: 'Paris', code: 'PRS' }
            ],
            selectedCity: null,
            countries: [
                {
                    name: 'Australia',
                    code: 'AU',
                    states: [
                        {
                            name: 'New South Wales',
                            cities: [
                                { cname: 'Sydney', code: 'A-SY' },
                                { cname: 'Newcastle', code: 'A-NE' },
                                { cname: 'Wollongong', code: 'A-WO' }
                            ]
                        },
                        {
                            name: 'Queensland',
                            cities: [
                                { cname: 'Brisbane', code: 'A-BR' },
                                { cname: 'Townsville', code: 'A-TO' }
                            ]
                        }
                    ]
                },
                {
                    name: 'Canada',
                    code: 'CA',
                    states: [
                        {
                            name: 'Quebec',
                            cities: [
                                { cname: 'Montreal', code: 'C-MO' },
                                { cname: 'Quebec City', code: 'C-QU' }
                            ]
                        },
                        {
                            name: 'Ontario',
                            cities: [
                                { cname: 'Ottawa', code: 'C-OT' },
                                { cname: 'Toronto', code: 'C-TO' }
                            ]
                        }
                    ]
                },
                {
                    name: 'United States',
                    code: 'US',
                    states: [
                        {
                            name: 'California',
                            cities: [
                                { cname: 'Los Angeles', code: 'US-LA' },
                                { cname: 'San Diego', code: 'US-SD' },
                                { cname: 'San Francisco', code: 'US-SF' }
                            ]
                        },
                        {
                            name: 'Florida',
                            cities: [
                                { cname: 'Jacksonville', code: 'US-JA' },
                                { cname: 'Miami', code: 'US-MI' },
                                { cname: 'Tampa', code: 'US-TA' },
                                { cname: 'Orlando', code: 'US-OR' }
                            ]
                        },
                        {
                            name: 'Texas',
                            cities: [
                                { cname: 'Austin', code: 'US-AU' },
                                { cname: 'Dallas', code: 'US-DA' },
                                { cname: 'Houston', code: 'US-HO' }
                            ]
                        }
                    ]
                }
            ]
}
        
    },

  methods: {
        toggle(event) {
            this.$refs.op.toggle(event);

        },
        print(){
            return this.selectedCities;
        }
    }

}

</script>


<style>
.buttonPanel{
 z-index: 2;
    position: absolute;
    top:1%;
    left:1%;    
    gap: 20px;

}
.card{
    z-index: 3;
    position: absolute;
    width:25%;
    height:70%;
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
