<template>
    <li :class="style.card">
        <Column :class="style.icons">
            <Close @click.stop="handleCloseButtonClick"/>
        </Column>
        <h4>{{ data.city }}</h4>
        <div :class="style.country">{{ data.country }}</div>
    </li>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import Close from '@UI/Icons/Close.vue';
import Column from '@UI/Column/Main.vue';
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