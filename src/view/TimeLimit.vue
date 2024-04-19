<template>
  <div class="items-center column container">
    <div class="q-my-xl row">
      <TransitionGroup name="card">
        <q-card class="q-pa-lg" v-for="card in cards" :key="card">{{ card }}</q-card>
      </TransitionGroup>
    </div>
    <div class="q-my-xl">
      <q-input v-model="input" @keydown="handleTyping" color="active" outlined></q-input>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 输入框
const input = ref('')

// 卡片组
const cards = ref([1, 2, 3, 4, 5])

// 进行输入
function handleTyping(e: KeyboardEvent) {
  if (e.key == ' ') {
    cards.value.shift()

    cards.value.push(cards.value[3] + 1)
  }
}

</script>

<style lang="scss" scoped>
.container {
  border: solid 1px;
}

.card-move,
.card-enter-active,
.card-leave-active {
  transition: all 0.5s ease;
}

.card-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.card-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.card-leave-active {
  position: absolute;
}
</style>