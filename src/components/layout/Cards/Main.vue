<template>
    <Column as="ul" :class="style.cards">
        <slot />
    </Column>
</template>

<script setup>
import Column from '@UI/Column/Main.vue';
import style from './Main.module.scss';
</script>

<script>
export default {
    name: "Cards"
}
</script>