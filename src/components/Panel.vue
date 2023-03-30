<template>
 

    <!-- Panel de gauche -->
    <div class="card p-hidden">

        <!-- Texte présent dedans -->
        <Card>
            <template #title>
                Options                
            </template>

        
              

                <template #content>
                    <ScrollPanel style="width: 100%; height: 550px">
                    
                    <p>Scénarios: {{selectedScenario}}</p>
                    <p>Graphiques: {{ selectedGraph}}</p>
                    <!--
                    <JSCharting :options="chartOptions" ></JSCharting>
                    <JSCharting :options="chartOptions2" ></JSCharting>
                    <JSCharting :options="chartOptions3" ></JSCharting> -->

                    <!-- Ajout d'une checkbox pour voir si l'ajout d'élément fonctionne -->
                    <Checkbox v-model="checked" :binary="true" />

                    <button @click="getPosts">Show Posts</button>
                    <p id="resulatScript"></p>                    

                     <div>
                        <button @click="getDossier">Mettre à jour les données</button>
                        <p id="dossier"></p>
                        <p>Données: {{ cities }}</p>
                    </div>

                    </ScrollPanel>

                </template>

        </Card>
    </div>

</template>


<script>
import Card from 'primevue/card';
import ScrollPanel from 'primevue/scrollpanel';

import { ref } from "vue";
import { reactive } from 'vue';
import JSCharting from 'jscharting-vue';


import { reactive } from "vue";
// import JSCharting from 'jscharting-vue';

// var L = [];


export default {
    name: 'panelComponent',
    props: {
            selectedScenario: String,
            selectedGraph: String

        },

    components: {
        Card,

        ScrollPanel,
        JSCharting
    },

    
    data() {
        return {
<!--
            myData: 'Valeur initiale des données',
            checked : ref(false),
            checkedPanel : ref(false),
            selectedCities: null,
            // cities: [
            //     { name: 'New York', code: 'NY' },
            //     { name: 'Rome', code: 'RM' },
            //     { name: 'London', code: 'LDN' },
            //     { name: 'Istanbul', code: 'IST' },
            //     { name: 'Paris', code: 'PRS' }
            // ],
            cities: this.myData,
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
       -->

    },

  methods: {
        toggle(event) {
            this.$refs.op.toggle(event);

        },
        print(){
            return this.selectedCities;
        },
        getPosts() {
            fetch('http://127.0.0.1:5000/test')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                var resulatScript = document.getElementById("resulatScript");
                resulatScript.innerText += data["message"] ;
                });
        },

        getDossier() {
            fetch('http://127.0.0.1:5000/arboresance')
            .then(response => response.json())
            .then(data => {
                this.cities = data;
                console.log(this.cities);

        });
        },
    },  
    setup() {    
            return this.selectedScenario;
        },
        printGraph(){
            return this.selectedGraph;
        }
    },
    
        const chartOptions = reactive({
         type: 'simpleLine',
         series: [
            {
               points: [
                  { x: 'A', y: 50 },
                  { x: 'B', y: 30 },
                  { x: 'C', y: 50 }
                  ]
              }
          ]
        });

      const chartOptions2 = reactive({
        //  type: 'horizontal column',
        //type: 'simpleLine',
        legend: { 
            visible: true,
            position: 'bottom right',
            // legendEntry_visible: false
        },
		title: { label: { text: 'Cost over time' } },
		yAxis: [
            /* Main axis is defined first. */
            { formatString: 'c' },
            /* Secondary axis will sync with main axis by default. */
            // {
            // 	id: 'secondY',
            // 	orientation: 'opposite',
            // 	line: { color: '#e2e2e2' },
            // 	defaultTick: {
            // 		enabled: false,
            // 		gridLine: { visible: false }
            // 	}
            // }
        ],
		xAxis: {
            crosshair: { enabled: true },
            scale: { type: 'time' }
        },
		defaultSeries: {
            type: 'line',
            defaultPoint: { 
                marker: { visible: false } 
            },
            // lastPoint: {
            // 	label: { text: '<b>%seriesName</b>' },
            // 	yAxisTick: {
            // 		axisId: 'secondY',
            // 		label: { text: '%yValue' }
            // 	}
            // }
        },

         series: [
				{
					name: 'Purchases',
					points: [
						['1/1/2020', 29.9],
						['2/1/2020', 97.5],
						['3/1/2020', 110.4],
						['4/1/2020', 129.2],
						['5/1/2020', 144.0],
						['6/1/2020', 176.0],
						['7/1/2020', 182.0],
						['8/1/2020', 186.0],
						['9/1/2020', 181.0],
						['10/1/2020', 178.0],
						['11/1/2020', 184.0],
						['12/1/2020', 176.0]
					]
				},
				{
					name: 'Taxes',
					points: [
						['1/1/2020', 86.9],
						['2/1/2020', 79.5],
						['3/1/2020', 95.4],
						['4/1/2020', 97.2],
						['5/1/2020', 123.0],
						['6/1/2020', 111.0],
						['7/1/2020', 122.0],
						['8/1/2020', 135.0],
						['9/1/2020', 140.0],
						['10/1/2020', 139.0],
						['11/1/2020', 135.0],
						['12/1/2020', 132.0]
					]
				},
				{
					name: 'Supplies',
					points: [
						['1/1/2020', 129.9],
						['2/1/2020', 111.5],
						['3/1/2020', 66.4],
						['4/1/2020', 29.2],
						['5/1/2020', 88.0],
						['6/1/2020', 102.0],
						['7/1/2020', 82.0],
						['8/1/2020', 75.0],
						['9/1/2020', 162.0],
						['10/1/2020', 110.0],
						['11/1/2020', 90.0],
						['12/1/2020', 85.0]
					]
				},
				{
					name: 'Rent',
					points: [
						['1/1/2020', 56.9],
						['2/1/2020', 56.5],
						['3/1/2020', 56.4],
						['4/1/2020', 56.2],
						['5/1/2020', 75.0],
						['6/1/2020', 56.0],
						['7/1/2020', 56.0],
						['8/1/2020', 56.0],
						['9/1/2020', 56.0],
						['10/1/2020', 67.0],
						['11/1/2020', 67.0],
						['12/1/2020', 67.0]
					]
				}
         ]
        });

        const chartOptions3 = reactive({
        debug: true, 
        type: 'column', 
        yAxis: { 
            scale_type: 'stacked', 
            label_text: 'Units Sold'
        }, 
        title_label_text: 'Acme Tool Sales', 
        xAxis: { 
            label_text: 'Quarter', 
            categories: ['Q1', 'Q2', 'Q3', 'Q4'] 
        },          
        series: [ 
            { 
            name: 'Saw', 
            id: 's1', 
            points: [230, 240, 267, 238] 
            }, 
            { 
            name: 'Hammer', 
            points: [325, 367, 382, 371] 
            }, 
            { 
            name: 'Grinder', 
            points: [285, 292, 267, 218] 
            }, 
            { 
            name: 'Drill', 
            points: [185, 192, 198, 248] 
            } 
        ] 
        });

      return { chartOptions, chartOptions2, chartOptions3 }; 

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
    width:50%;
    height:70%;
    top:180%;
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

.p-multiselect {
    margin-right: 10px;
    margin-left: 10px;

}

</style>
