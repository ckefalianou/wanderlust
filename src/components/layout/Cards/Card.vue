<template>
    <li :class="style.card">
        <div :class="style.icons">
            <Close @click.stop="handleCloseButtonClick"/>
        </div>
        <h4>{{ data.city }}</h4>
        <div :class="style.country">{{ data.country }}</div>
    </li>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import Close from '@UI/Icons/Close.vue';
import style from './Card.module.scss';

const emit = defineEmits('closeButtonClick');

const props = defineProps({
    data: {
        type: Object,
        default: () => {}
    },
});

const handleCloseButtonClick = () => {
    emit('closeButtonClick', props.data.id);
}
</script>