<template>
    <a 
        target="_blank" 
        :class="style.place" 
        :href="googleIt(`${data.properties.name ?? data.properties.address_line1} ${data.properties.state} ${data.properties.county}`)"
        :style="{ 
            backgroundImage: `url(${data.properties?.wiki_and_media?.image ?? ''})`, 
            backgroundPosition: 'center center', 
            backgroundRepeat: 'no-repeat', 
            backgroundSize: 'cover' 
        }"
    >
        <div :class="style.placeInner">
            <h3>{{ data.properties.name ?? data.properties.address_line1 }}</h3>
            <h4 v-if="data.properties.state || data.properties.city || data.properties.county">
                <template v-if="data.properties.state || data.properties.city">
                    {{ data.properties.state ?? data.properties.city  }},
                </template> 
                <template v-if="data.properties.county">
                    {{ data.properties.county }} 
                </template>
            </h4>
        </div>
    </a>
</template>

<script setup>
import { defineProps } from 'vue';
import style from './Place.module.scss';

defineProps({
    data: {
        type: Object,
        required: true
    }
});

const googleIt = searchKey => {
    return `https://www.google.com/search?q=${searchKey.toLowerCase().replaceAll(' ','+')}`;
}
</script>