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
                    <JSCharting :options="chartOptions" ></JSCharting>
                    <JSCharting :options="chartOptions2" ></JSCharting>
                    <JSCharting :options="chartOptions3" ></JSCharting>
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

import { reactive } from 'vue';
import JSCharting from 'jscharting-vue';

import { ref } from "vue";

export default {
    name: 'panelComponent',

    components: {
        Checkbox,
        Button,
        Card,
        JSCharting
    },
    
    data() {
        return {
            checked : ref(false),
            checkedPanel : ref(false)
        }   
    },

  methods: {
        toggle(event) {
            this.$refs.op.toggle(event);
        }
    },
    
    setup() {        
        
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
