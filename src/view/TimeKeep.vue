<template>
  <div class="items-center column">
    <div class="q-my-xl"></div>
    <div v-show="!showResult" class="items-center column">
      <div @focus="startTyping" @blur="endTyping" @keydown.prevent="typing" @click="handleTyping" ref="inputContainer"
        tabindex="0" autofocus class="row words-container">
        <div ref="caret" class="caret"></div>
        <div :ref="(el) => setBlockRef(el as HTMLElement, index)" v-for="(word, index) in words" :key="index"
          class="column items-center word-block">
          <div class="cn-word">{{ word.cn }}</div>
          <div class="en-word">
            <code v-for="(code, cIndex) in word.en" :key="cIndex">{{ code }}</code>
          </div>
        </div>
      </div>
      <q-btn class="re-btn" padding="xl" icon="refresh" size="lg" unelevated />
    </div>
    <Transition name="result">
      <div v-show="showResult" class="result items-center column">
        <div class="row justify-around result-item-container">
          <div class="result-item">
            <div class="result-key">WPM</div>
            <div class="result-value correct">{{ typingResult.wpm }}</div>
          </div>
          <div class="result-item">
            <div class="result-key">正确率</div>
            <div class="result-value correct">{{ typingResult.correctness }}</div>
          </div>
          <div class="result-item">
            <div class="result-key">用时</div>
            <div class="result-value correct">{{ typingResult.during }}</div>
          </div>
        </div>
        <q-btn @click="restart" class="re-btn" padding="xl" icon="refresh" size="lg" unelevated />
      </div>
    </Transition>
  </div>

</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import useCaret from '@/hooks/useCaret'
import useTyping from '@/hooks/useTyping'
import useProcess from '@/hooks/useProcess';
import type { TypingResult } from '@/types';


/* 数据 */
let words = ref([  // 词组
  { cn: '测试', en: 'ceshi' },
  { cn: '测试', en: 'ceshi' },
  { cn: '测试', en: 'yruiwer' }
])
let showResult = ref(false)   // 结果是否显示
let typingResult = ref<TypingResult>({ wpm: '', correctness: '', during: '' })  // 结果显示数据
let curIndex = ref<[number, number]>([0, 0])  // 当前caret索引，格式为 [block索引, code索引]
let startTime = ref<number | null>(null)      // 计时：开始时间

// 监听索引变化，变化后定位浮标
watch(curIndex, () => {
  handleTyping()
}, { deep: true })


/* 节点 */
let caret = ref<HTMLElement | null>(null)   // caret元素节点
const blockRefs = ref<HTMLElement[]>([])    // block元素ref节点集合

// 设置block动态ref集合
const setBlockRef = (el: HTMLElement, index: number) => {
  if (el) {
    blockRefs.value[index] = el
  }
}


/* 自定义hook */
let { handleTyping } = useCaret(caret, curIndex, blockRefs)   // 根据索引定位caret
let { handleEnd, restart } = useProcess(startTime, words, typingResult, curIndex, showResult)   // 处理开始和结束流程操作
let { startTyping, endTyping, typing } = useTyping(caret, curIndex, words, blockRefs, handleEnd, startTime)   // 根据键盘输入修改索引与样式


/* 生命周期 */
onMounted(() => {
  // 监听屏幕改动，实时调整浮标位置
  window.addEventListener('resize', handleTyping)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleTyping)
})

</script>

<style lang="scss" scoped>
// 词组容器
.words-container {
  width: 900px;
  gap: 15px;
  user-select: none;

  // 浮标
  .caret {
    display: block;
    position: absolute;
    width: 3px;
    height: 28px;
    background-color: deepskyblue;
    border-radius: 10px;
    transition: .2s ease-out;
  }

  // 词组
  .word-block {

    // 下方拼音
    .en-word {
      margin-top: -3px;

      // 单个字母
      code {
        transition: 0.2s;
        font-family: 'Consolas';
        margin: 0 0.5px;
        font-size: 23px;
        opacity: .5;
      }
    }

    // 上方汉字
    .cn-word {
      transition: 0.2s;
      font-size: medium;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol, "Noto Color Emoji";
    }
  }

  // 容器聚焦样式
  &:focus {
    outline: none;
  }

}

// 重启按钮
.re-btn {
  margin-top: 80px;
  opacity: .5 !important;
}

// 结果显示
.result {

  position: absolute;
  top: 30%;

  .result-item-container {
    .result-item {
      margin: 0 80px;

      .result-key {
        font-size: 20px;
        font-weight: 500;
        opacity: .5;
      }

      .result-value {
        font-size: 44px;
      }
    }
  }
}

.result-enter-active {
  transition: opacity 0.4s ease;
}

.result-enter-from {
  opacity: 0;
}
</style>