
<template>
     <div class="toolBar">
        <Toolbar>
            <template #start>
                <Button label="New" icon="pi pi-plus" class="mr-2" />
                <Button label="Upload" icon="pi pi-upload" severity="success" />
                <i class="pi pi-bars p-toolbar-separator mr-2" />
                <SplitButton label="Save" icon="pi pi-check" :model="items" severity="warning"></SplitButton>
            </template>

            <template #end>
                <Button icon="pi pi-search" class="mr-2" />
                <Button icon="pi pi-calendar" severity="success" class="mr-2" />
                <Button icon="pi pi-times" severity="danger" />
            </template>
        </Toolbar>
    </div>
</template>

<script>
import { ref } from "vue";

import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import SplitButton from 'primevue/splitbutton';

// Import des librairies css pour primevue
import "primevue/resources/themes/lara-light-indigo/theme.css";  //theme   
import "primevue/resources/primevue.min.css";  //core
import "primeicons/primeicons.css"; //icons

export default {
    name: 'menuComponent',

    components: {
        Toolbar,
        SplitButton,
        Button
    },

    data() {
        return {
          items : ref([
    {
        label: 'Update',
        icon: 'pi pi-refresh'
    },
    {
        label: 'Delete',
        icon: 'pi pi-times'
    },
    {
        label: 'Vue Website',
        icon: 'pi pi-external-link',
        command: () => {
            window.location.href = 'https://vuejs.org/';
        }
    },
    {
        label: 'Upload',
        icon: 'pi pi-upload',
        command: () => {
            this.$router.push('fileupload');
        }
    }
])
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
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    padding: 0.5rem;
    border-radius: 6px;
    gap: 0.5rem;
}

</style>
