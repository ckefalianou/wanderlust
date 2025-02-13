<template>
    <div :class="style.sideMenu">
        <div :class="style.logoWrapper">
            <Logo />
        </div>
        <Cards @drop="drop" v-if="mapStore.cards.length">
            <Card 
                draggable="true" 
                @dragover="dragover" 
                @dragstart="dragstart"  
                @click="togglePlacesModal(index)"
                :data="card" 
                v-for="card,index in mapStore.cards" 
                :key="`card-${index}`" 
                :index="index" 
                v-bind="$attrs"
            />
        </Cards>
        <div :class="style.emptyListMessage" v-else>
            Hello stranger! <br><br>
            The floor is yours! <br><br>
            Pin all the places you want to visit!!
        </div>
    </div>
    <Teleport to="#modal" v-if="isMounted">
        <Transition name="slide" mode="out-in">
            <SlideIn v-if="isPlacesModalOpen" @slideInCloseButtonClick="handleSlideInClose">
                <Places :data="mapStore.cards[activeCardData]"/>
            </SlideIn>
        </Transition>
    </Teleport>
</template>

<script>
export default {
    name: "Sidemenu"
};
</script>

<script setup>
import Logo from '@UI/Logo/Main.vue';
import style from './Main.module.scss';
import Cards from '@Layout/Cards/Main.vue';
import Card from '@Layout/Cards/Card.vue';
import SlideIn from '@UI/SlideIn/Main.vue';
import Places from '@Layout/Places/Main.vue';
import { reactive, toRaw, ref, onMounted, defineEmits } from 'vue';
import { useMapStore } from '@Store/mapStore.js';

const mapStore = useMapStore();
const isMounted = ref(false);
const isPlacesModalOpen = ref(false);
const activeCardData = ref(null);

const emit = defineEmits(['closeButtonClick']);

const dragData = reactive({
    itemIndex: null,
    overItemIndex: null,
});

const dragstart = e => {
    dragData.itemIndex = +e.target.getAttribute('index');
}

const dragover = e => {
    e.preventDefault();

    if(e.target.getAttribute('index') && dragData.overItem !== e.target.getAttribute('index')){
        dragData.overItemIndex = +e.target.getAttribute('index');
    }
}

const drop = e => {
    let tempData = toRaw(mapStore.cards[dragData.itemIndex]);
    mapStore.cards.splice(dragData.itemIndex, 1);
    mapStore.cards.splice(dragData.overItemIndex, 0, tempData);
};

const togglePlacesModal = (cardIndex) => {
    isPlacesModalOpen.value = true;
    activeCardData.value = cardIndex;
};

const handleSlideInClose = () => {
    isPlacesModalOpen.value = false;
    activeCardData.value = null;
    emit('closeButtonClick');
};

onMounted( () => {
    isMounted.value = true;
} );
</script>