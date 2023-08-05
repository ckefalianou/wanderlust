<template>
    <Column :class="style.places">
        <h1>Discover Places in {{ data.city }}, {{ data.country }}</h1> 
        <template v-for="item in placesConstants" :key="item.key" >
            <template v-if="places?.[item.key]?.length > 0">
                <Column :class="style.placesCarousel">
                    <h2>{{ item.title }}</h2>
                    <Carousel>
                        <Place :id="place.properties.place_id" v-for="place, index in places[item.key]" :key="`tourirm-${index}`" :data="place" />
                    </Carousel>
                </Column>
            </template>
        </template>
    </Column>
</template>

<script setup>
import Carousel from '@UI/Carousel/Main.vue';
import Column from '@UI/Column/Main.vue';
import Place from './Place.vue';
import { defineProps, computed, ref, watch } from 'vue';
import axios from 'axios';
import style from './Main.module.scss';

const places = ref({});

const placesConstants = [
    {
        title: "Tourism",
        key: "tourism"
    },
    {
        title: "Accommodation",
        key: "accommodation"
    },
]

const props = defineProps({
    data: {
        type: Object,
        required: true
    }
});
const commonApi = computed ( () => `https://api.geoapify.com/v2/places?lang=en&filter=circle:${props.data.longitude},${props.data.latitude},5000&apiKey=3159c0af4eda4919806b574d5ba5157a`);
const tourismApiUrl = computed ( () => `${commonApi.value}&categories=tourism.attraction,tourism.sights`);
const accommodationApiUrl = computed ( () => `${commonApi.value}&categories=accommodation`);

const getPlaces = () => {
    places.value = {};
    axios.get(tourismApiUrl.value).then( response => { 
        places.value.tourism = response.data.features 
    }).catch( error => console.log(error) );
    axios.get(accommodationApiUrl.value).then( response => { places.value.accommodation = response.data.features }).catch( error => console.log(error) );
}; 

getPlaces();

watch(props, () => {
    getPlaces();
})
</script>

<script>
export default {
    name: "Places"
};
</script>