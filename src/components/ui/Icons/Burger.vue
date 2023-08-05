<template>
    <Column as="span" :class="style.icon" @click="$emit('click')">
        <span />
        <span />
        <span />
    </Column>
</template>

<script setup>
import Column from '@UI/Column/Main.vue';
import style from './Burger.module.scss';
import { defineEmits } from 'vue';
defineEmits('click');
</script>