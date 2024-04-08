<template>
    <div class="q-pa-md">
        <Header></Header>
        <div class="q-pa-md">
            <RouterView></RouterView>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Header from './Header.vue'
</script>

<style lang="scss" scoped></style>