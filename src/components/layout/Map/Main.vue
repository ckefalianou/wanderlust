<template>
    <div id="map" :class="style.map"></div>
</template>

<script>
export default {
    name: "Map"
};
</script>

<script setup>
import L from "leaflet";
import { ref, defineProps, watch, toRaw, onMounted } from 'vue';
import renderId from '@Helpers/renderId.js';
import "leaflet/dist/leaflet.css";
import style from './Main.module.scss';
import axios from 'axios';
import { useMapStore } from '@Store/mapStore.js';

const mapStore = useMapStore();
const isMounted = ref(false);

const props = defineProps({
    markerToRemove: {
        type: String,
        default: null
    }
});

const map = ref(null);
const markers = ref({});

watch(() => props.markerToRemove, val => {
    map.value.removeLayer(markers.value[val]);
});

onMounted( () => {
    isMounted.value = true;
} );

const icon = L.icon({
    iconUrl: 'icons/pin.png',
    shadowUrl:  false,

    iconSize:     [32, 32], // size of the icon
    iconAnchor:   [16, 32], // point of the icon which will correspond to marker's location
    popupAnchor:  [-16, -32] // point from which the popup should open relative to the iconAnchor
});

navigator.geolocation.getCurrentPosition( position => {
    let currentCoords = [position.coords.latitude, position.coords.longitude];

    map.value = L.map('map').setView(currentCoords, 7);

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
    }).addTo(map.value);

    if(localStorage.getItem('wanderlust')){
        let wanderLustStorage = JSON.parse(localStorage.getItem('wanderlust'));
        mapStore.cards = wanderLustStorage;

        wanderLustStorage.forEach(item => {
            markers.value[item.id] = L.marker([item.latitude,item.longitude], {icon: icon,  id: item.id}).addTo(map.value);
        });
    }

    map.value.on('click', e => { 
        let {lat,lng} = e.latlng;
        let id = renderId();

        markers.value[id] = L.marker([lat,lng], {icon: icon,  id: id}).addTo(map.value);

        axios.get(`https://api.bigdatacloud.net/data/reverse-geocode?latitude=${e.latlng.lat}&longitude=${e.latlng.lng}&key=bdc_aa675a4b480c41ee8bca959be900473c`)
        .then(res => { 
            let data = { 
                id: id,
                country: res.data.countryName,
                city: res.data?.city || res.data.locality,
                principalSubdivision: res.data.principalSubdivision,
                latitude: res.data.latitude,
                longitude: res.data.longitude
            };
            mapStore.cards.push(data);
            localStorage.setItem('wanderlust', JSON.stringify(toRaw(mapStore.cards)));
        })
        .catch(err => console.log(err));
    },
    err => {
        alert(`Bucketlist App is unavailable right now. Details: ${err.message}`)
    });

});
</script>