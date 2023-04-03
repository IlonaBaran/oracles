<template>
    <!-- Panel de gauche -->
    <div class="card p-hidden">

        <!-- Texte présent dedans -->
        <Card>
            <template #title>
                Options
            </template>

            <template #content>
                <ScrollPanel style="width: 100%; height: 75vh " class="custombar1">

                    <!-- Affichage dans le panel des paramètres saisies par l'utilisateur dans le header -->
                    <!-- <p>{{ selectedScenario }}</p>
                    <p>{{ selectedGraph }}</p> -->

                    <button @click="lineChartAffichage">Affichage d'un diagramme en ligne</button>
                    <button @click="roseVentAffichage">Affichage d'un diagramme rose des vents</button>

                    <button @click="lineChart">Affichage d'un diagramme rose des vents</button>
                    <apexchart  :options="this.chartOptions"  :series="this.series"/>    
    
                        <!-- AFFICHAGE DES GRAPHIQUES 
                    <JSCharting :options="chartOptions" ></JSCharting> -->

                </ScrollPanel>

            </template>
        </Card>
    </div>
</template>





<script>
/* eslint-disable */
import { ApexChart } from 'vue3-apexcharts';
import Card from 'primevue/card';
import ScrollPanel from 'primevue/scrollpanel';

import { ref } from "vue";
import { reactive } from "vue";

export default {
    name: 'panelComponent',

    components: {
        Card,
        ScrollPanel,
    },

    props: {
        selectedScenario: {
            type: Object,
            required: true
        },
        selectedGraph: {
            type: Object,
            required: true
        },
        // chartOptions: {
        //     type: Object,
        //     required: true
        // },
        // series: {
        //     type: Object,
        //     required: true
        // }
    },


    data() {
        return {
//             checked: ref(false),
//             checkedPanel: ref(false),
            chartOptions: ref(false),
            series: ref(null),
            // chartOptions: {
            //     chart: {
            //     height: 350,
            //     type: 'line',
            //     },
            //     series: [{
            //     name: 'sales',
            //     data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
            //     }],
            //     xaxis: {
            //     categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            //     }
            // },
            // series: [{
            //     name: 'sales',
            //     data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
            // }]
        };
    },


        methods: {
            lineChart(){
                this.chartOptions = reactive({
                    chart: {
                        id: 'mychart',
                        height: 350,
                        type: 'line',
                        zoom: {
                            enabled: false
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: 'straight'
                    },
                    title: {
                        text: 'Product Trends by Month',
                        align: 'left'
                    },
                    grid: {
                        row: {
                            colors: ['#f3f3f3', 'transparent'],
                            opacity: 0.5
                        },
                    },
                    xaxis: {
                        tooltip: {
                            enabled: false
                        },
                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                    }
            });

            this.series =  [{
                name: "Desktops",
                data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
            }]
        },
    },
};




        // lineChartAffichage() {
        // var abcisses = [];
        // var ordonnees = [];
        // for (const element of this.selectedScenario) {
        //     // RECUPERATION DES DONNES AVEC DES FECTH - c
        //     var file = 'http://localhost:8081/' + element["name"] + '.json';
        //     fetch(file)
        //         .then(response => response.json())
        //         .then(data => {
        //             console.log(data);
        //             for (const property in data) {
        //                 // var dict = {
        //                 //     x: `${data[property]["heure"]}`,
        //                 //     y: parseFloat(`${data[property]["Maree(m)"]}`),
        //                 // };
        //                 abcisses.push(`${data[property]["heure"]}`);
        //                 ordonnees.push(parseFloat(`${data[property]["Maree(m)"]}`));
        //             }
        //             // this.lineChart();
        //             // this.lineChart(abcisses, ordonnees);

        //         })
        //     }
        // },
    // }



    // methods: {
    //     lineChart() {
    //         this.chartOptions = {
    //         chart: {
    //             type: 'line'
    //         },
    //         series: [{
    //             name: 'Sales',
    //             data: [30,40,35,50,49,60,70,91,125]
    //         }],
    //         xaxis: {
    //             categories: [2000,2001,2002,2003,2004,2005,2006,2007,2008]
    //         }
        //     this.chartOptions = reactive({
        //         defaultSeries: {
        //             type: 'line',
        //             defaultPoint_marker_visible: false
        //         },
        //         series: [
        //             {
        //                 points: data
        //             }
        //         ]
        //     });
        //     }
        // },

        // roseChart(){
        //     this.chartOptions2 = reactive({
        //         // type: 'windrose column',
        //         type: 'radar column', 
        //         animation_duration: 1000, 
        //         title: { 
        //             label_text: 'Wind Rose Chart', 
        //             position: 'center'
        //         }, 
        //         legend: { 
        //             title_label_text: 'Wind Speed (in mph)', 
        //             position: 'bottom', 
        //             template: '%icon %name', 
        //             reversed: true
        //         }, 
        //         annotations: [{ 
        //             label: { 
        //                 text: 'Calm: 17%<br>Avg speed: 7.9 mph', 
        //                 style_fontSize: 14 
        //             }, 
        //             position: 'inside bottom right'
        //         }], 
        //         defaultSeries_shape_padding: 0.02, 
        //         yAxis: { 
        //             defaultTick_label_text: '%value%', 
        //             scale: { type: 'stacked' }, 
        //             alternateGridFill: 'none'
        //         }, 
        //         xAxis: { 
        //             scale: { range: [0, 360], interval: 45 }, 
        //             customTicks: [ 
        //                 { value: 360, label_text: 'N' }, 
        //                 { value: 45, label_text: 'NE' }, 
        //                 { value: 90, label_text: 'E' }, 
        //                 { value: 135, label_text: 'SE' }, 
        //                 { value: 180, label_text: 'S' }, 
        //                 { value: 225, label_text: 'SW' }, 
        //                 { value: 270, label_text: 'W' }, 
        //                 { value: 315, label_text: 'NW' } 
        //             ] 
        //         }, 
        //         series: [{
        //             name: 'Wind Speed (in mph)',
        //             data: [
        //                 { angle: 5, speed: 0, value: 0.50 },
        //                 { angle: 15, speed: 135, value: 0.40 },
        //                 { angle: 15, speed: 180, value: 0.20 }
        //             ],
        //             fillColors: [
        //                 '#c62828',
        //                 '#ff7043',
        //                 '#fff176',
        //                 '#aed581',
        //                 '#80cbc4'
        //             ]
        //         }]
        //     });
        // },
    
        // lineChartAffichage() {
        // this.chart = new ApexCharts(document.querySelector("#chart"), this.chartOptions);
        // this.chart.render();
        // var L = [];
        // for (const element of this.selectedScenario) {
        //     // RECUPERATION DES DONNES AVEC DES FECTH - c
        //     var file = 'http://localhost:8081/' + element["name"] + '.json';
        //     fetch(file)
        //         .then(response => response.json())
        //         .then(data => {
        //             console.log(data);
        //             for (const property in data) {
        //                 var dict = {
        //                     x: `${data[property]["heure"]}`,
        //                     y: parseFloat(`${data[property]["Maree(m)"]}`),
        //                 };
        //                 L.push(dict);
        //             }
        //             this.lineChart();
        //         })
        //     }
//         },
//   },

//         roseVentAffichage() {
//             var L = [];
//            this.roseChart();

            // for (const element of this.selectedScenario) {
            //     // RECUPERATION DES DONNES AVEC DES FECTH - c
            //     var file = 'http://localhost:8081/' + element["name"] + '.json';
            //     fetch(file)
            //         .then(response => response.json())
            //         .then(data => {
            //             console.log(data);
            //             for (const property in data) {
            //                 var dict = {
            //                     angle: parseFloat(`${data[property]["Dir(vent)()"]}`),
            //                     speed: parseFloat(`${data[property]["U(vent)(m)"]}`),
            //                 };
            //                 L.push(dict);
            //             }
            //             // this.lineChart(L);
            //         })
    //         // }
    //     }
    // }

    //   const chartOptions2 = reactive({
    //     //  type: 'horizontal column',
    //     //type: 'simpleLine',
    //     legend: { 
    //         visible: true,
    //         position: 'bottom right',
    //         // legendEntry_visible: false
    //     },
    // 	title: { label: { text: 'Cost over time' } },
    // 	yAxis: [
    //         /* Main axis is defined first. */
    //         { formatString: 'c' },
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
    // ],
    // xAxis: {
    //     crosshair: { enabled: true },
    //     scale: { type: 'time' }
    // },
    // defaultSeries: {
    //     type: 'line',
    //     defaultPoint: { 
    //         marker: { visible: false } 
    //     },
    // lastPoint: {
    // 	label: { text: '<b>%seriesName</b>' },
    // 	yAxisTick: {
    // 		axisId: 'secondY',
    // 		label: { text: '%yValue' }
    // 	}
    // }
    // }
    //  series: [
    // 		{
    // 			name: 'Purchases',
    // 			points: [
    // 				['1/1/2020', 29.9],
    // 				['2/1/2020', 97.5],
    // 				['3/1/2020', 110.4],
    // 				['4/1/2020', 129.2],
    // 				['5/1/2020', 144.0],
    // 				['6/1/2020', 176.0],
    // 				['7/1/2020', 182.0],
    // 				['8/1/2020', 186.0],
    // 				['9/1/2020', 181.0],
    // 				['10/1/2020', 178.0],
    // 				['11/1/2020', 184.0],
    // 				['12/1/2020', 176.0]
    // 			]
    // 		},
    // 		{
    // 			name: 'Taxes',
    // 			points: [
    // 				['1/1/2020', 86.9],
    // 				['2/1/2020', 79.5],
    // 				['3/1/2020', 95.4],
    // 				['4/1/2020', 97.2],
    // 				['5/1/2020', 123.0],
    // 				['6/1/2020', 111.0],
    // 				['7/1/2020', 122.0],
    // 				['8/1/2020', 135.0],
    // 				['9/1/2020', 140.0],
    // 				['10/1/2020', 139.0],
    // 				['11/1/2020', 135.0],
    // 				['12/1/2020', 132.0]
    // 			]
    // 		},
    // 		{
    // 			name: 'Supplies',
    // 			points: [
    // 				['1/1/2020', 129.9],
    // 				['2/1/2020', 111.5],
    // 				['3/1/2020', 66.4],
    // 				['4/1/2020', 29.2],
    // 				['5/1/2020', 88.0],
    // 				['6/1/2020', 102.0],
    // 				['7/1/2020', 82.0],
    // 				['8/1/2020', 75.0],
    // 				['9/1/2020', 162.0],
    // 				['10/1/2020', 110.0],
    // 				['11/1/2020', 90.0],
    // 				['12/1/2020', 85.0]
    // 			]
    // 		},
    // 		{
    // 			name: 'Rent',
    // 			points: [
    // 				['1/1/2020', 56.9],
    // 				['2/1/2020', 56.5],
    // 				['3/1/2020', 56.4],
    // 				['4/1/2020', 56.2],
    // 				['5/1/2020', 75.0],
    // 				['6/1/2020', 56.0],
    // 				['7/1/2020', 56.0],
    // 				['8/1/2020', 56.0],
    // 				['9/1/2020', 56.0],
    // 				['10/1/2020', 67.0],
    // 				['11/1/2020', 67.0],
    // 				['12/1/2020', 67.0]
    // 			]
    // 		}
    //  ]
    // });

    //     const chartOptions3 = reactive({
    //     debug: true, 
    //     type: 'column', 
    //     yAxis: { 
    //         scale_type: 'stacked', 
    //         label_text: 'Units Sold'
    //     }, 
    //     title_label_text: 'Acme Tool Sales', 
    //     xAxis: { 
    //         label_text: 'Quarter', 
    //         categories: ['Q1', 'Q2', 'Q3', 'Q4'] 
    //     },          
    //     series: [ 
    //         { 
    //         name: 'Saw', 
    //         id: 's1', 
    //         points: [230, 240, 267, 238] 
    //         }, 
    //         { 
    //         name: 'Hammer', 
    //         points: [325, 367, 382, 371] 
    //         }, 
    //         { 
    //         name: 'Grinder', 
    //         points: [285, 292, 267, 218] 
    //         }, 
    //         { 
    //         name: 'Drill', 
    //         points: [185, 192, 198, 248] 
    //         } 
    //     ] 
    //     });

    //   return { chartOptions, chartOptions2, chartOptions3 }; 

// }
</script>


<style>
.buttonPanel {
    z-index: 2;
    position: absolute;
    top: 1%;
    left: 1%;
    gap: 20px;
}

.card {
    z-index: 3;
    position: absolute;
    width: 50%;
}

#app .p-card .p-card-title {
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    top: 5%;
}

#app .p-card-body {
    height: calc(87vh);
}

p {
    margin: 0px;
}

.p-scrollpanel.custombar1 .p-scrollpanel-wrapper {
    border-right: 10px solid var(--surface-ground);
}

.p-scrollpanel.custombar1 .p-scrollpanel-bar {
    background-color: var(--primary-300);
    opacity: 1;
    transition: background-color 0.3s;
}

.p-scrollpanel.custombar1 .p-scrollpanel-bar:hover {
    background-color: var(--primary-400);
}
</style>
