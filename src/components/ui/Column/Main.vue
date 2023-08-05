<template>
    <component :class="style.column" :is="as">
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
    name: 'Column'
}
</script>