<template>
    <div :class="style.homeLayout">
        <Sidemenu @closeButtonClick="deletePin" />
        <Map :marker-to-remove="markerToRemove" />
        <div :class="style.modal" id="modal"></div>
    </div>
</template>

<script setup>
import Sidemenu from '@Layout/Sidemenu/Main.vue';
import Map from '@Layout/Map/Main.vue';
import style from './HomePage.module.scss';
import { ref, toRaw } from 'vue';
import { useMapStore } from '@Store/mapStore.js';

const markerToRemove = ref(null);
const mapStore = useMapStore();

const deletePin = id => {
    markerToRemove.value = id;

    const objWithIdIndex = mapStore.cards.findIndex((obj) => obj.id === id);
    if (objWithIdIndex > -1) {
        mapStore.cards.splice(objWithIdIndex, 1);
        localStorage.setItem('wanderlust', JSON.stringify(toRaw(mapStore.cards)));
    }
}
</script>