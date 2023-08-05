<template>
<Column :class="style.carouselWrapper">
    <Row :class="style.carousel">
        <Row :class="style.carouselInner" :style="{transform: `translateX(-${currentElPos}px)` }">
            <slot />
        </Row>
    </Row>
    <Row :class="style.arrows">
        <div @click="handleArrows('previous')">{{ '<' }}</div>
        <div  @click="handleArrows('next')">{{ '>' }}</div>
    </Row>
</Column>
</template>
<script setup>
import { useSlots, computed, ref } from 'vue';
import Row from '@UI/Row/Main.vue';
import Column from '@UI/Column/Main.vue';
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

