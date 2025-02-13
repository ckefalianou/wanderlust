<template>
    <ul :class="style.cards">
        <slot />
    </ul>
</template>

<script setup>
import style from './Main.module.scss';
</script>

<script>
export default {
    name: "Cards"
}
</script>