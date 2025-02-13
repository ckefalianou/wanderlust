<template>
    <div :class="style.slideIn">
        <Close @click.stop="handleCloseButtonClick" :class="style.closeBtn"/>
        <slot />
    </div>
</template>

<script setup>
import style from './Main.module.scss';
import Close from '@UI/Icons/Close.vue';
import { defineEmits } from 'vue';

const emit = defineEmits('slideInCloseButtonClick');

const handleCloseButtonClick = () => {
    emit('slideInCloseButtonClick');
}
</script>

<script>
export default {
    name: "SlideIn"
};
</script>