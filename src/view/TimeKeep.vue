<template>
  <div class="items-center column">
    <!-- 生成词数选择 -->
    <div class="q-ma-lg num-chooser">
      <span v-for="(num, index) in availableNum" :key="index">
        <span v-if="index != 0" class="num-chooser-split">/</span>
        <span @click="chooseNum(num)" :class="curNum == num ? 'correct' : ''" class="num-chooser-num">{{ num }}</span>
      </span>
    </div>
    <div v-show="!showResult" class="items-center column">
      <div ref="blocksContainer" @focus="startTyping" @blur="endTyping" @keydown="typing" @keydown.space.prevent
        @click="handleTyping" tabindex="0" class="row words-container">
        <div ref="caret" class="caret"></div>
        <div :ref="(el) => setBlockRef(el as HTMLElement, index)" v-for="(word, index) in words" :key="index"
          class="column items-center word-block">
          <div class="cn-word">{{ word.cn }}</div>
          <div class="en-word">
            <code v-for="(code, cIndex) in word.en" :key="cIndex">{{ code }}</code>
          </div>
        </div>
      </div>
      <q-btn @keydown.space.prevent="restart(curNum)" @click="restart(curNum)" class="re-btn" padding="xl"
        icon="refresh" size="lg" unelevated />
      <div :class="startTime ? 'transport' : ''" class="tip column q-mt-xl items-center">
        <span>点击词块即可开始输入</span>
        <span>按<q-btn padding="0px 3px" push label="Space" />进入下一个词块</span>
        <span>输入第一个字母后开始计时</span>
        <span><q-btn padding="0px 3px" push label="Tab" />+<q-btn padding="0px 3px" push label="Space" />可以快速刷新</span>
      </div>
    </div>
    <Transition name="result">
      <div v-show="showResult" class="result items-center column">
        <div class="row justify-around result-item-container">
          <div class="result-item">
            <div class="result-key row items-center">WPM
              <q-icon color="text" class="q-ml-xs cursor-pointer" name="info">
                <q-tooltip transition-show="scale" transition-hide="scale" class="text-btnText bg-active"
                  anchor="top middle" self="bottom middle" :offset="[10, 10]">
                  <b><em style="text-decoration: underline;font-size: 14px">Words Per Minute</em></b><br>
                  <span style="font-size: 13px;">每分钟键入的单词数</span>
                </q-tooltip>
              </q-icon>
            </div>
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
        <q-btn @keydown.space.prevent="restart(curNum)" @click="restart(curNum)" class="re-btn" padding="xl"
          icon="refresh" size="lg" unelevated />
      </div>
    </Transition>
  </div>

</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, watch, nextTick } from 'vue'
import useCaret from '@/hooks/TimeKeep/useCaret'
import useTyping from '@/hooks/TimeKeep/useTyping'
import useProcess from '@/hooks/TimeKeep/useProcess'
import { useTypingStore } from '@/stores/useTypingStore'
import type { TypingResult } from '@/types'
import { storeToRefs } from 'pinia'
import { useSettingStore } from '@/stores/useSettingStore'

/* store中的数据 */
const { words, caret, blocksContainer, startTime } = storeToRefs(useTypingStore())
const { setBlockRef } = useTypingStore()
const { settings } = useSettingStore()

/* 数据 */
const showResult = ref(false)   // 结果是否显示
const typingResult = ref<TypingResult>({ wpm: '', correctness: '', during: '' })  // 结果显示数据
const curIndex = ref<[number, number]>([0, 0])  // 当前caret索引，格式为 [block索引, code索引]
const curNum = ref(settings.generateWordsNum)   // 当前生成词数
const availableNum = ref([20, 30, 40, 50])      // 可生成词数

/* 自定义hook */
const { handleTyping } = useCaret(curIndex)   // 根据索引定位caret
const { handleEnd, restart } = useProcess(typingResult, curIndex, showResult)   // 处理开始和结束流程操作
const { startTyping, endTyping, typing } = useTyping(curIndex, handleEnd)   // 根据键盘输入修改索引与样式

/* 方法 */

// 选择词数
function chooseNum(num: number) {
  if (curNum.value != num) {
    curNum.value = num
    // 重新生成
    restart(curNum.value)
  }
}

/* 生命周期 */

nextTick(() => {
  // 手动聚焦
  if (blocksContainer.value) {
    blocksContainer.value.focus()
  }
})

onMounted(() => {
  // 监听屏幕改动，实时调整浮标位置
  window.addEventListener('resize', handleTyping)

  // 监听索引变化，变化后定位浮标
  watch(curIndex, () => {
    handleTyping()
  }, { deep: true, immediate: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleTyping)
})

</script>

<style lang="scss" scoped>
// 选择词数
.num-chooser {
  align-self: flex-start;
  font-size: 1rem;

  .num-chooser-num {
    cursor: pointer;
    padding: 5px;
    opacity: .5;
    transition: 0.5s;
  }

  .num-chooser-split {
    font-weight: bolder;
    opacity: .5;

  }
}

// 词组容器
.words-container {
  @media (width < 500px) {
    width: 90vw;
  }

  width: 60vw;
  gap: 15px;

  // 浮标
  .caret {
    display: block;
    position: absolute;
    width: 3px;
    height: 28px;
    background-color: $active;
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
        font-size: 22px;
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

/* 提示文字 */
.tip {
  opacity: .5;
  font-size: 12px;
  transition: 1s;
  line-height: 1.7;

  .q-btn {
    border-radius: 4px;
    color: $bg;
    font-size: 10px;
    background-color: $text;
    margin: 0 3px;
  }

  animation: fade-in 1s ease;
}
</style>