<template>
  <div class="items-center column container">
    <div class="q-my-xl row card-container items-center">
      <TransitionGroup name="card" appear>
        <q-card v-for="(card, index) in cards" :key="card.id" :class="getCardClass(index)"
          class="column justify-center items-center shadow-5">
          <div>{{ card.cn }}</div>
          <div>{{ card.en }}</div>
        </q-card>
      </TransitionGroup>
    </div>
    <div class="q-my-xl row items-center full-width">
      <div class="col">计时</div>
      <div class="col row justify-center">
        <q-input v-model="input" @keydown="handleTyping" color="active" outlined/>
      </div>
      <div class="col">
        <q-btn @keydown.space.prevent="restart" @click="restart" class="re-btn" padding="xl" icon="refresh" size="lg"
          unelevated />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import { nanoid } from 'nanoid'
import { useSettingStore } from '@/stores/useSettingStore'
import { storeToRefs } from 'pinia'
import type { InputCard, WordCard } from '@/types'

// 获取所有词组
const { allWords } = storeToRefs(useSettingStore())
// 已输入完成的词组
const currentWords = ref<InputCard[]>([])

// 动态属性
function getCardClass(index: number) {
  if (index == 2) {
    return 'mid-card'
  } else if (index == 0 || index == 4) {
    return 'edge-card'
  } else {
    return ''
  }
}

// 输入框
const input = ref('')

// 卡片组
const cards = ref<WordCard[]>([])
// 加载时获取
getWord(true)


// 进行输入
function handleTyping(e: KeyboardEvent) {
  // 输入空格后切换至下一个卡片
  if (e.key == ' ') {
    console.log('1' + input.value + '2')
    // 判断该卡片输入是否正确并添加到已输入的卡片中
    const { en, cn } = cards.value[2]
    const typing = input.value.trim()   // 去除可能出现的空格
    const isCorrect = typing == en || typing == cn
    currentWords.value.push({ cn, en, typing, isCorrect })

    // 清空当前输入框
    nextTick(() => {
      input.value = ''
    })

    // 删除第一个元素并在最后添加一个元素
    cards.value.shift()
    getWord(false)

  }
}

// 重新开始计时
function restart() {

}


// 获取词组
function getWord(getFive: boolean) {

  // 浅拷贝，以避免直接修改allWords
  const availableWords = JSON.parse(JSON.stringify(allWords.value))

  if (!availableWords) {
    console.error('当前无词块')
    return
  }

  // 如果可用词块数量不足，则直接返回
  if (availableWords.length < 5) {
    console.error('可用词块数不足5个！')
  }

  // 初始化时添加5个随机词组
  if (getFive) {
    const result = []
    // 随机选中5个词组添加到result中返回
    for (let i = 0; i < 5; i++) {
      // 生成一个随机索引
      const randomIndex = Math.floor(Math.random() * availableWords.length)
      // 从可用词块中获取随机选择的词块
      result.push({ id: nanoid(), ...availableWords[randomIndex] })
    }
    cards.value = result
  } else {
    // 否则添加1个随机词组
    const word = availableWords.splice(Math.floor(Math.random() * availableWords.length), 1)[0]
    cards.value.push({ id: nanoid(), ...word })
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
  opacity: 0 !important;
  transform: translateX(200px);
}

.card-leave-to {
  opacity: 0 !important;
  transform: translateX(-200px);
}

.card-leave-active {
  position: absolute;
}

// 卡片
.card-container {
  gap: 40px;
  height: 300px;

  .q-card {
    width: 180px;
    height: 180px;
    background-color: $bg;
    color: $text;
    opacity: .5;
    transition: all 0.5s ease;
    font-size: 1.4em;
    border-radius: 20px;

  }

  // 中间的卡片
  .mid-card {
    height: 240px;
    width: 240px;
    opacity: 1;
    font-size: 2.5em;
  }

  // 边缘的卡片
  .edge-card {
    height: 120px;
    width: 120px;
    opacity: .2;
    font-size: 1em;
  }
}

// 输入框
.q-input{
  width: 240px;
  font-size: 2.5em;
}

// 重启按钮
.re-btn {
  opacity: .5 !important;
}
</style>