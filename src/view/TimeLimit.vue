<template>
  <div class="items-center column container">
    <div class="q-my-xl row card-container">
      <TransitionGroup name="card">
        <q-card v-for="card in cards" :key="card" class="q-pa-xl column justify-center items-center" >{{ card }}</q-card>
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
const cards = ref([1, 2, 3])

// 进行输入
function handleTyping(e: KeyboardEvent) {
  if (e.key == ' ') {
    cards.value.shift()

    cards.value.push(cards.value[1] + 1)
  }
}

</script>

<style lang="scss" scoped>
.container {
  border: solid 1px;
}

// 卡片动画
.card-move,
.card-enter-active,
.card-leave-active {
  transition: all 0.5s ease;
}

.card-enter-from {
  opacity: 0;
  transform: translateX(200px);
}

.card-leave-to {
  opacity: 0;
  transform: translateX(-200px);
}

.card-leave-active {
  position: absolute;
}
// 卡片
.card-container{
  gap: 40px;

  .q-card{
    width: 200px;
    height: 200px;
  }
}
</style>