<template>
  <div class="items-center column">
    <div class="q-my-xl"></div>
    <div v-show="!showResult" class="items-center column">
      <div ref="blocksContainer" @focus="startTyping" @blur="endTyping" @keydown="typing" @click="handleTyping" tabindex="0"
        autofocus class="row words-container">
        <div ref="caret" class="caret"></div>
        <div :ref="(el) => setBlockRef(el as HTMLElement, index)" v-for="(word, index) in words" :key="index"
          class="column items-center word-block">
          <div class="cn-word">{{ word.cn }}</div>
          <div class="en-word">
            <code v-for="(code, cIndex) in word.en" :key="cIndex">{{ code }}</code>
          </div>
        </div>
      </div>
      <q-btn @keydown.space="restart" @click="restart" class="re-btn" padding="xl" icon="refresh" size="lg" unelevated />
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
        <q-btn @keydown.space="restart" @click="restart" class="re-btn" padding="xl" icon="refresh" size="lg" unelevated />
      </div>
    </Transition>
  </div>

</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import useCaret from '@/hooks/useCaret'
import useTyping from '@/hooks/useTyping'
import useProcess from '@/hooks/useProcess'
import { useTypingStore } from '@/stores/useTypingStore'
import type { TypingResult } from '@/types'
import { storeToRefs } from 'pinia'


/* store中的数据 */
const { words, caret, blocksContainer } = storeToRefs(useTypingStore())
const { generateWords, setBlockRef } = useTypingStore()

// 生成随机词组
generateWords(5)


/* 数据 */
const showResult = ref(false)   // 结果是否显示
const typingResult = ref<TypingResult>({ wpm: '', correctness: '', during: '' })  // 结果显示数据
const curIndex = ref<[number, number]>([0, 0])  // 当前caret索引，格式为 [block索引, code索引]

// 监听索引变化，变化后定位浮标
watch(curIndex, () => {
  handleTyping()
}, { deep: true })

/* 自定义hook */
const { handleTyping } = useCaret(curIndex)   // 根据索引定位caret
const { handleEnd, restart } = useProcess(typingResult, curIndex, showResult)   // 处理开始和结束流程操作
const { startTyping, endTyping, typing } = useTyping(curIndex, handleEnd)   // 根据键盘输入修改索引与样式


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
      transition: 0.1s;
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