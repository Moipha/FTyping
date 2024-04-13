<template>
  <q-separator color="white"></q-separator>

    <q-splitter v-model="splitterModel" separator-style="background-color: white" style="height: 400px">

      <template v-slot:before>
        <div class="q-pa-md">
          <q-tree text-color="white" color="white" :nodes="simple" node-key="label" selected-color="amber" v-model:selected="selected"
            default-expand-all />
        </div>
      </template>

      <template v-slot:after>
        <q-tab-panels dark v-model="selected" animated transition-prev="jump-up" transition-next="jump-up">
          <q-tab-panel name="计时模式">
            <div class="text-h4 q-mb-md">Welcome</div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
              quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam.
              In, libero.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
              quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam.
              In, libero.</p>
          </q-tab-panel>

          <q-tab-panel name="限时模式">
            <div class="text-h4 q-mb-md">Food</div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
              quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam.
              In, libero.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
              quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam.
              In, libero.</p>
          </q-tab-panel>

          <q-tab-panel name="其他设置">
            <div class="text-h4 q-mb-md">Room service</div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
              quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam.
              In, libero.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
              quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam.
              In, libero.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
              quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam.
              In, libero.</p>
          </q-tab-panel>

          <q-tab-panel name="Room view">
            <div class="text-h4 q-mb-md">Room view</div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
              quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam.
              In, libero.</p>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
              quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam.
              In, libero.</p>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
</template>

<script lang="ts" setup>
import { ref } from 'vue';


const splitterModel = ref(20)
const selected = ref('计时模式')

const simple = ref([{
  label: '设置',
  children: [
    {
      label: '计时模式',
      icon: 'restaurant_menu',
      children: [
        {
          label: '词组'
        }
      ]
    },
    {
      label: '限时模式',
      icon: 'room_service'
    },
    {
      label: '其他设置',
      icon: 'photo'
    }
  ]
}])

</script>

<style lang="scss" module></style>