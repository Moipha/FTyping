<template>
  <div class="row q-pa-md justify-between container">
    <q-tabs v-model="tab" active-color="active">
      <q-route-tab draggable="false" to="/time-keep" exact name="timeKeep" icon="alarm" label="计时" />
      <q-route-tab draggable="false" to="/time-limit" exact name="timeLimit" icon="notifications_none" label="限时" />
      <q-route-tab draggable="false" to="/rank" exact name="rank" icon="equalizer" label="统计" />
      <q-route-tab draggable="false" to="/setting" exact name="setting" icon="settings" label="设置" />
    </q-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// tab栏选中项
let tab = ref('timeKeep')
</script>

<style lang="scss" scoped></style>
