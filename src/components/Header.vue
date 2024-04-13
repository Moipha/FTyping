<template>
    <div class="row q-pa-md justify-between">
        <q-tabs v-model="tab">
            <q-route-tab to="/time-keep" exact name="timeKeep" icon="alarm" label="计时" />
            <q-route-tab to="/time-limit" exact name="timeLimit" icon="notifications_none" label="限时" />
        </q-tabs>
       <div class="row items-center">
        <q-fab color="amber" text-color="black" icon="menu" direction="left">
            <q-fab-action to="/setting" color="amber" text-color="black" icon="settings" />
            <q-fab-action color="amber" text-color="black" icon="alarm" />
        </q-fab>
       </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// tab栏选中项
let tab = ref('timeKeep')


</script>

<style lang="scss" scoped>

</style>