<template>
    <div class="row q-pa-md justify-between">
        <q-tabs v-model="tab" active-color="active">
            <q-route-tab draggable="false" to="/time-keep" exact name="timeKeep" icon="alarm" label="计时" />
            <q-route-tab draggable="false" to="/time-limit" exact name="timeLimit" icon="notifications_none" label="限时" />
        </q-tabs>
        <div class="row items-center">
            <q-fab color="active" text-color="btnText" icon="menu" direction="left">
                <q-fab-action draggable="false" to="/rank" color="active" text-color="btnText" icon="equalizer" />
                <q-fab-action draggable="false" to="/setting" color="active" text-color="btnText" icon="settings" />
            </q-fab>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// tab栏选中项
let tab = ref('timeKeep')


</script>

<style lang="scss" scoped></style>