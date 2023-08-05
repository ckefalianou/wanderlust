<template>
    <component :class="style.row" :is="as">
        <slot />
    </component>
</template>

<script setup>
import { defineProps } from 'vue';
import style from './Main.module.scss';

defineProps({
    as: {
        type: String,
        default: 'div'
    },
});
</script>

<script>
export default {
    name: 'Row'
}
</script>