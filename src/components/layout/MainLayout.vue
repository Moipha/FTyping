<template>
    <div class="q-pa-md main">
        <Header></Header>
        <div class="q-pa-md">
            <RouterView></RouterView>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Header from './Header.vue'
</script>

<style lang="scss" scoped>
.main {
    background-color: $bg;
    color: $text;
    transition: 0.5s;
    height: 100vh;
}
</style>