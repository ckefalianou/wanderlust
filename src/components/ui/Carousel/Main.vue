<template>
<div :class="style.carouselWrapper">
    <div :class="style.carousel">
        <div :class="style.carouselInner" :style="{transform: `translateX(-${currentElPos}px)` }">
            <slot />
        </div>
    </div>
    <div :class="style.arrows">
        <div @click="handleArrows('previous')">{{ '<' }}</div>
        <div  @click="handleArrows('next')">{{ '>' }}</div>
    </div>
</div>
</template>
<script setup>
import { useSlots, computed, ref } from 'vue';
import style from './Main.module.scss';

const slots = useSlots();
const currentIndex = ref(0);
const currentElPos = ref(0);
const children = computed( () => slots.default()[0].children );

const handleArrows = dest => {
    if(dest === 'previous') {
        if(currentIndex.value !== 0) {
            currentIndex.value--;
        }
    }else if(dest === 'next'){
        if(currentIndex.value !== children.value.length -1) {
            currentIndex.value++;
        }
    }

    currentElPos.value = document.getElementById(children.value[currentIndex.value].props.id).offsetLeft;
}
</script>
<script>
export default {
    name: "Carousel"
};
</script>

