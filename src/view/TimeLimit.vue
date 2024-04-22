<template>
  <div class="items-center column">
    <!-- 词组卡片 -->
    <div class="q-my-xl row card-container items-center">
      <TransitionGroup name="card" appear>
        <q-card v-for="(card, index) in cards" :key="card.id" :class="getCardClass(index, card)"
          class="column justify-center items-center shadow-5">
          <div>{{ card.cn }}</div>
          <div>{{ card.en }}</div>
        </q-card>
      </TransitionGroup>
    </div>
    <!-- 计时、输入框、按钮 -->
    <div class="q-mt-xl row items-center full-width">
      <div class="col row justify-end">
        <div>
          <div class="time-limit shadow-3" :class="status ? '' : 'wrong'">{{ formatTime }}</div>
          <q-popup-edit v-model="timeLimit" auto-save v-slot="scope">
            <q-input v-model="scope.value" autofocus @keyup.enter="scope.set" />
          </q-popup-edit>
        </div>
      </div>
      <div class="input-container shadow-3">
        <q-input ref="inputRef" :disable="!status" v-model="input" @keydown="handleTyping" input-class="input"
          borderless />
      </div>
      <div class="col row justify-start">
        <div class="btn-container shadow-3">
          <q-btn @keydown.space.prevent="restart" @click="restart" class="re-btn" icon="refresh" size="lg" flat />
        </div>
      </div>
    </div>
    <!-- 结果显示 -->
    <div class="result-container">
      <!-- wpm显示 -->
      <Transition name="wpm">
        <q-card v-if="!status" class="shadow-3 row justify-center">
          <div class="wpm correct">WPM {{ result.wpm }}</div>
        </q-card>
      </Transition>

      <!-- 正误词组显示 -->
      <Transition name="word">
        <div v-if="!status" class="row item-container">
          <div class="result-item col">
            <q-card class="col shadow-3 correct row justify-center">
              <q-expansion-item header-class="expansion" class="fit"
                :label='`正确 ${result.correctWords.length.toString()}`'>
                <div class="row">
                  <q-card v-for="word in result.correctWords"
                    class="shadow-3 correct-card column justify-center items-center result-block">
                    <div>{{ word.cn }}</div>
                    <div>{{ word.typing }}</div>
                  </q-card>
                </div>
              </q-expansion-item>
            </q-card>
          </div>
          <div class="result-item col">
            <q-card class="col shadow-3 wrong row justify-center">
              <q-expansion-item header-class="expansion" class="fit"
                :label='`错误 ${result.wrongWords.length.toString()}`'>
                <div class="row">
                  <q-card v-for="word in result.wrongWords"
                    class="shadow-3 wrong-card column justify-center items-center result-block">
                    <div>{{ word.cn }}</div>
                    <div>{{ word.typing }}</div>
                  </q-card>
                </div>
              </q-expansion-item>
            </q-card>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick, computed, watch } from 'vue'
import { nanoid } from 'nanoid'
import { useSettingStore } from '@/stores/useSettingStore'
import { storeToRefs } from 'pinia'
import type { LimitResult, WordCard } from '@/types'

// 获取所有词组
const { allWords } = storeToRefs(useSettingStore())
// 已输入完成的词组
const currentWords = ref<WordCard[]>([])
// 剩余时间
const restTime = ref()
const timeLimit = ref(10)

watch(timeLimit, (value) => {
    restTime.value = value
  }, { deep: true, immediate: true })


// 当前状态，输入中或结算中
const status = ref(true)

// 输入框节点
const inputRef = ref<HTMLElement | null>(null)

// 动态属性
function getCardClass(index: number, card: WordCard) {
  let result = ''
  // 对指定位置的卡片添加样式
  if (index == 2) {
    result += 'mid-card '
  } else if (index == 0 || index == 4) {
    result += 'edge-card '
  }
  // 添加正误样式
  if (card.isCorrect != null) {
    if (card.isCorrect) {
      result += 'correct-card'
    } else {
      result += 'wrong-card'
    }
  }

  return result
}
// 格式化时间
const formatTime = computed(() => {
  const minutes = Math.floor(restTime.value / 60) // 计算分钟数
  const seconds = restTime.value % 60 // 计算剩余的秒数

  // 使用模板字符串确保分钟和秒都以两位数形式表示，并添加必要的零填充
  const formattedMinutes = String(minutes).padStart(2, '0')
  const formattedSeconds = String(seconds).padStart(2, '0')

  return `${formattedMinutes}:${formattedSeconds}`
})

// 当前计时器
let timer: number | undefined

// 开始计时
function startCount() {
  if (!timer) {
    timer = setInterval(() => {
      // 每秒更新剩余时间
      restTime.value--

      if (restTime.value == 0) {
        clearInterval(timer)
        // 时间到
        timeOut()
      }
    }, 1000)
  }

}

// 计时结束后
function timeOut() {
  cards.value.forEach(card => {
    card.cn = '时间已到'
    card.en = 'timeout'
    card.isCorrect = false
  })
  status.value = false
  // 计算结果

  // 获取拼写正确的词组和错误的词组
  const correctWords = currentWords.value.filter((block) => block.isCorrect)
  const wrongWords = currentWords.value.filter((block) => !block.isCorrect)

  // 计算WPM，四舍五入保留两位小数
  const correctLength = correctWords.length
  let wpmNumber = (correctLength / timeLimit.value * 60)
  wpmNumber = Math.round(wpmNumber * 100) / 100.
  const wpm = wpmNumber.toFixed(2)

  // 写入结果显示
  result.value = { wpm, correctWords, wrongWords }
}

// 显示结果的数据
const result = ref<LimitResult>({ wpm: '', correctWords: [], wrongWords: [] })


// 输入框
const input = ref('')

// 卡片组
const cards = ref<WordCard[]>([])

// 加载时获取
getWord(true)

// 进行输入
function handleTyping(e: KeyboardEvent) {
  // 输入字母后开始计时
  if (e.code.startsWith('Key') || e.key == ' ') {
    startCount()
  }
  // 输入空格后切换至下一个卡片
  if (e.key == ' ') {
    // 判断该卡片输入是否正确并添加到已输入的卡片中
    const { id, en, cn } = cards.value[2]
    const typing = input.value.trim()   // 去除可能出现的空格
    const isCorrect = typing == en || typing == cn
    currentWords.value.push({ id, cn, en, typing, isCorrect })
    // 修改词组属性以更改样式
    cards.value[2].isCorrect = isCorrect

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
  // 恢复状态
  status.value = true
  // 清空列表
  cards.value = []
  currentWords.value = []
  input.value = ''
  // 重新计时
  restTime.value = timeLimit.value
  clearInterval(timer)
  timer = undefined
  // 重新获取词组
  getWord(true)
  // 输入框获取焦点
  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.focus()
    }
  })
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

/* 生命周期 */
nextTick(() => {
  // 加载后聚焦
  if (inputRef.value) {
    inputRef.value.focus()
  }
})

</script>

<style lang="scss" scoped>
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
  width: 1000px;
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

// 计时器
.time-limit {
  height: 80px;
  line-height: 80px;
  padding: 0 20px;
  font-size: 3.4em;
  border-radius: 10px;
  cursor: pointer;
}

// 输入框
.input-container {
  height: 80px;
  border-radius: 10px;
  padding: 8px 0;
  margin: 0 10px;
  transition: .4s ease;
  border: solid 3px transparent;

  .q-input {
    width: 240px;
    font-size: 2.5em;
    padding-left: 10px;
  }

  &:focus-within {
    border-color: $active;
  }
}

// 重启按钮
.btn-container {
  border-radius: 10px;
  height: 80px;

  .re-btn {
    border-radius: 10px;
    height: 80px;
    width: 158px;
  }
}

// 结果
.result-container {
  margin: 10px 0;
  width: 580px;

  .q-card {
    border-radius: 10px;
  }

  .wpm {
    font-size: 3em;
    height: 80px;
    line-height: 80px;
  }

  .item-container {
    margin-top: 10px;
    gap: 10px;

    .result-item {
      .result-block {
        line-height: normal;
        font-size: 1.2em;
        padding: 10px 15px;
        margin-bottom: 5px;
        margin-left: 5px;
      }
    }
  }
}

// 结果动画

.wpm-enter-active {
  transition: all 0.5s ease;
}

.wpm-leave-active {
  transition: all 0.5s ease;
  transition-delay: 0.5s;
}

.wpm-enter-from {
  opacity: 0 !important;
  transform: translateY(80px);
}

.wpm-leave-to {
  opacity: 0 !important;
  transform: translateY(80px);
}



.word-enter-active {
  transition: all 0.5s ease;
  transition-delay: 0.5s;
}

.word-leave-active {
  transition: all 0.5s ease;
}

.word-enter-from {
  opacity: 0 !important;
  transform: translateY(80px);
}

.word-leave-to {
  opacity: 0 !important;
  transform: translateY(80px);
}

</style>
<style lang="scss">
.input-container .input {
  color: $text;
  caret-color: $active;
}

.expansion {
  height: 80px;
  line-height: 80px;
  text-align: center;
  font-size: 2em;
}
</style>