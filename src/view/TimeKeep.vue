<template>
  <div class="items-center column">
    <div class="q-my-xl"></div>
    <div class="row words-container">
      <div v-for="(word, index) in words" :key="index" class="column items-center word-block">
        <div class="cn-word">{{ word.cn }}</div>
        <div class="en-word">{{ word.en }}</div>
      </div>
    </div>
    <q-btn
      style="margin-top: 80px;"
      padding="xl"
      icon="refresh"
      size="lg"
      unelevated
      
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

let words = ref([
  { cn: '测试', en: 'ceshi' },
  { cn: '测试', en: 'ceshi' },
  { cn: '测试', en: 'ceshi' },
  { cn: '测试', en: 'ceshi' },
  { cn: '测试', en: 'ceshi' },
  { cn: '测试', en: 'ceshi' },
  { cn: '测试', en: 'ceshi' },
  { cn: '测试', en: 'ceshi' },
  { cn: '测试', en: 'ceshi' },
  { cn: '测试文字', en: 'ceshiwenzi' },
  { cn: '测试', en: 'ceshi' },
  { cn: '测试', en: 'ceshi' },
  { cn: '测试', en: 'ceshi' },
  { cn: '测试文字', en: 'ceshiwenzi' },
  { cn: '测试文字', en: 'ceshiwenzi' },
  { cn: '测试', en: 'ceshi' },
  { cn: '测试文字', en: 'ceshiwenzi' },
  { cn: '测试', en: 'ceshi' },
  { cn: '测试', en: 'ceshi' },
  { cn: '测试', en: 'ceshi' },
  { cn: '测试', en: 'ceshi' },
  { cn: '测试文字', en: 'ceshiwenzi' },
  { cn: '测试', en: 'ceshi' },
  { cn: '测试', en: 'ceshi' },
  { cn: '测试', en: 'ceshi' },
  { cn: '测试', en: 'ceshiiiii' },
  { cn: '测试文字', en: 'ceshiwenzi' },
  { cn: '测试', en: 'ceshi' },
  { cn: '测试文字', en: 'ceshiwenzi' },
  { cn: '测试文字', en: 'ceshiwenzi' },
  { cn: '测试', en: 'ceshi' },
  { cn: '测试文字', en: 'ceshiwenzi' },
  { cn: '测试文字', en: 'ceshiwenzi' },
  { cn: '测试文字', en: 'ceshiwenzi' },
  { cn: '测试文字', en: 'ceshiwenzi' },
  { cn: '测试', en: 'ceshi' },
  { cn: '测试', en: 'ceshi' },
])

</script>

<style lang="scss" scoped>
.words-container {
  border: 1px solid;
  width: 900px;
  gap: 15px;
}

.word-block {
  font-size: 20px;
  border: 1px solid;

  .en-word {
    letter-spacing: 2px;
    font-family: 'Consolas';
  }

  .cn-word {
    font-size: medium;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol, "Noto Color Emoji";
  }
}

</style>