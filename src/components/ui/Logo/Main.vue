<template>
    <div :class="style.logo">
        <span :class="style.listIcon">
            <span :class="style.listIconDot"></span>
            <span :class="style.listIconDot"></span>
            <span :class="style.listIconDot"></span>
        </span>
        <h1> WANDERLUST </h1>
    </div>
</template>

<script>
export default {
    name: 'Logo'
};
</script>

<script setup>
import style from './Main.module.scss';
</script>