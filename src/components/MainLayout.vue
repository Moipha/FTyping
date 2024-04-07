<template>
    <div class="q-pa-md">
        <Header></Header>
        <div class="container q-pa-md">
            <RouterView></RouterView>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Header from './Header.vue'
</script>

<style lang="scss" scoped>
.container {
    border: 1px solid;
}

</style>