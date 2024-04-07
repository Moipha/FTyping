<template>
    <div class="row q-pa-md">
        <q-tabs v-model="tab">
            <q-route-tab to="/time-keep" exact name="timeKeep" icon="alarm" label="计时" />
            <q-route-tab to="/time-limit" exact name="timeLimit" icon="notifications_none" label="限时" />
        </q-tabs>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'


let tab = ref('timeKeep')
</script>

<style lang="scss" scoped></style>