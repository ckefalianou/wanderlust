<template>
    <div as="span" :class="style.icon" @click="$emit('click')">
        <span />
        <span />
        <span />
    </div>
</template>

<script setup>
import style from './Burger.module.scss';
import { defineEmits } from 'vue';
defineEmits('click');
</script>