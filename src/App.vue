<template>
    <!-- 加载界面 -->
    <Transition name="loading">
        <div v-if="loading" class="loader-wrapper fullscreen row justify-center content-center">
            <span class="loader">
                <span class="loader-inner"></span>
            </span>
        </div>
    </Transition>
    <!-- 主界面 -->
    <MainLayout></MainLayout>
</template>

<script lang="ts" setup>
import { onUnmounted, ref } from 'vue'
import MainLayout from './components/layout/MainLayout.vue'

const loading = ref(true)

// 注册控制加载事件
import emitter from './utils/emitter'
emitter.on('loading', (b) => {
    loading.value = b as boolean
})
onUnmounted(() => {
    emitter.off('loading')
})

</script>
<style lang="scss" scoped>
.loader-wrapper {
    background-color: $bg;

    .loader {
        display: inline-block;
        width: 30px;
        height: 30px;
        position: relative;
        border: 4px solid $active;
        animation: loader 2s infinite ease;

        .loader-inner {
            vertical-align: top;
            display: inline-block;
            width: 100%;
            background-color: $active;
            animation: loader-inner 2s infinite ease-in;
        }
    }
}
</style>
